'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Download, Upload, Copy, Check, Search } from 'lucide-react'

interface MemegTemplate {
  id: string
  name: string
  lines: number
  example: string
  url: string
}

export function MemeGenerator() {
  const [mode, setMode] = useState<'template' | 'upload'>('template')
  const [allTemplates, setAllTemplates] = useState<MemegTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<MemegTemplate[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<MemegTemplate | null>(null)
  const [topText, setTopText] = useState('HOLD $GUT')
  const [bottomText, setBottomText] = useState('FEED THE KING')
  const [memeUrl, setMemeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  // Upload mode states
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [uploadText, setUploadText] = useState('GUTLORD')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch templates from Memegen API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true)
        setError('')
        const response = await fetch('https://api.memegen.link/templates')
        
        if (!response.ok) {
          throw new Error('Failed to fetch meme templates')
        }

        const data = await response.json()
        
        // Filter templates that have proper structure
        const validTemplates: MemegTemplate[] = data
          .filter((t: any) => t.id && t.name && t.lines !== undefined)
          .map((t: any) => ({
            id: t.id,
            name: t.name || t.id,
            lines: t.lines || 2,
            example: t.example || '',
            url: t.url || `https://api.memegen.link/images/${t.id}`,
          }))
          .sort((a: MemegTemplate, b: MemegTemplate) => a.name.localeCompare(b.name))

        setAllTemplates(validTemplates)
        setFilteredTemplates(validTemplates)
        
        // Set first template as default
        if (validTemplates.length > 0) {
          setSelectedTemplate(validTemplates[0])
        }
      } catch (err) {
        console.error('[v0] Error fetching meme templates:', err)
        setError('Failed to load meme templates. Please try again.')
        setAllTemplates([])
        setFilteredTemplates([])
      } finally {
        setLoadingTemplates(false)
      }
    }

    fetchTemplates()
  }, [])

  // Handle template search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setFilteredTemplates(allTemplates)
      return
    }

    const filtered = allTemplates.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.id.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredTemplates(filtered)
  }

  // Generate meme from template
  const generateMeme = async () => {
    if (!selectedTemplate) {
      setError('Please select a template')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Properly encode text for URL
      const encodeText = (text: string) => {
        return encodeURIComponent(text || ' ')
          .replace(/'/g, '%27')
          .replace(/"/g, '%22')
      }

      const top = encodeText(topText)
      const bottom = encodeText(bottomText)

      // Build URL based on template lines
      let url: string
      if (selectedTemplate.lines === 0) {
        url = `https://api.memegen.link/images/${selectedTemplate.id}.png`
      } else if (selectedTemplate.lines === 1) {
        url = `https://api.memegen.link/images/${selectedTemplate.id}/${top}.png`
      } else {
        url = `https://api.memegen.link/images/${selectedTemplate.id}/${top}/${bottom}.png`
      }

      // Validate URL can be fetched
      const headResponse = await fetch(url, { method: 'HEAD' })
      if (!headResponse.ok) {
        throw new Error(`Template "${selectedTemplate.name}" failed to generate`)
      }

      setMemeUrl(url)
    } catch (err) {
      console.error('[v0] Error generating meme:', err)
      setError('Failed to generate meme. Please try another template.')
      setMemeUrl('')
    } finally {
      setLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 10MB.')
      return
    }

    setError('')
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setUploadedImage(result)
      drawCustomMeme(result, uploadText)
    }
    reader.onerror = () => {
      setError('Failed to read file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  // Draw custom meme on canvas
  const drawCustomMeme = (imgSrc: string, text: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const maxDimension = 4000
      let width = img.width
      let height = img.height

      if (width > maxDimension || height > maxDimension) {
        const ratio = width / height
        if (width > height) {
          width = maxDimension
          height = Math.round(maxDimension / ratio)
        } else {
          height = maxDimension
          width = Math.round(maxDimension * ratio)
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw image
      ctx.drawImage(img, 0, 0, width, height)

      // Draw text with outline
      const fontSize = Math.max(40, Math.round(width / 10))
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'

      const x = canvas.width / 2
      const y = canvas.height / 2 - fontSize / 2

      ctx.strokeText(text, x, y)
      ctx.fillText(text, x, y)

      // Add watermark
      ctx.font = 'bold 20px Arial, sans-serif'
      ctx.fillText('$GUT', x, canvas.height - 30)
      ctx.strokeText('$GUT', x, canvas.height - 30)

      const dataUrl = canvas.toDataURL('image/png')
      setMemeUrl(dataUrl)
      setError('')
    }

    img.onerror = () => {
      setError('Failed to load image. Please try again.')
    }

    img.src = imgSrc
  }

  // Download meme
  const downloadMeme = () => {
    if (!memeUrl) return

    const link = document.createElement('a')
    link.href = memeUrl
    link.download = 'gutlord-meme.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Copy meme link
  const copyMemeLink = () => {
    if (!memeUrl) return

    navigator.clipboard.writeText(memeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="meme-generator" className="px-4 py-20 md:py-32 bg-black relative">
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neon-green/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-6xl relative">
        <h2 className="text-center font-display text-5xl md:text-7xl tracking-tighter uppercase font-black mb-2">
          <span className="neon-text-glow">Meme Maker</span>
        </h2>
        <p className="text-center text-white font-display text-lg tracking-wide mb-8">
          Create memes and spread the GUTLORD gospel
        </p>

        {/* Mode selector */}
        <div className="flex gap-3 justify-center mb-12">
          <button
            onClick={() => setMode('template')}
            className={`px-6 py-3 rounded-lg font-display uppercase text-sm font-bold tracking-wider transition-all border-2 ${
              mode === 'template'
                ? 'border-neon-green bg-neon-green text-black'
                : 'border-neon-green/50 bg-black text-white hover:border-neon-green'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`px-6 py-3 rounded-lg font-display uppercase text-sm font-bold tracking-wider transition-all border-2 ${
              mode === 'upload'
                ? 'border-neon-green bg-neon-green text-black'
                : 'border-neon-green/50 bg-black text-white hover:border-neon-green'
            }`}
          >
            Upload Image
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Template Mode */}
        {mode === 'template' && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Controls */}
            <div className="flex flex-col gap-6">
              {/* Template Search and Selection */}
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Choose Template ({filteredTemplates.length}/{allTemplates.length})
                </label>

                {/* Search Box */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-3 size-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 rounded-lg border-2 border-neon-green/50 bg-black text-white p-2 text-sm placeholder:text-gray-600 focus:outline-none focus:border-neon-green"
                  />
                </div>

                {/* Template List */}
                {loadingTemplates ? (
                  <div className="p-4 text-center text-gray-400">Loading templates...</div>
                ) : filteredTemplates.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">No templates found</div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          selectedTemplate?.id === template.id
                            ? 'border-neon-green bg-neon-green/20 text-white'
                            : 'border-neon-green/30 bg-black text-white hover:border-neon-green/60'
                        }`}
                      >
                        <div className="font-bold text-sm">{template.name}</div>
                        <div className="text-xs text-gray-400">{template.lines} line{template.lines !== 1 ? 's' : ''}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Text */}
              {selectedTemplate && selectedTemplate.lines > 0 && (
                <div>
                  <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Top Text
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                    maxLength={50}
                    className="w-full rounded-lg border-2 border-neon-green/50 bg-black text-white p-3 font-display placeholder:text-gray-600 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(0,221,0,0.5)]"
                  />
                </div>
              )}

              {/* Bottom Text */}
              {selectedTemplate && selectedTemplate.lines > 1 && (
                <div>
                  <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Bottom Text
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                    maxLength={50}
                    className="w-full rounded-lg border-2 border-neon-green/50 bg-black text-white p-3 font-display placeholder:text-gray-600 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(0,221,0,0.5)]"
                  />
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateMeme}
                disabled={loading || !selectedTemplate}
                className="w-full rounded-lg border-2 border-neon-green bg-neon-green px-6 py-3 font-display text-black uppercase font-bold transition-all hover:shadow-[0_0_25px_rgba(0,221,0,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Meme'}
              </button>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              {memeUrl ? (
                <div className="w-full">
                  <div className="relative rounded-lg border-2 border-neon-green overflow-hidden shadow-[0_0_30px_rgba(0,221,0,0.5)] bg-black">
                    <Image
                      src={memeUrl}
                      alt="Generated meme"
                      width={400}
                      height={400}
                      className="w-full h-auto"
                      unoptimized
                      priority
                    />
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <button
                      onClick={downloadMeme}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-neon-green/50 bg-black text-white px-4 py-3 font-display uppercase text-sm font-bold hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,221,0,0.5)] transition-all"
                    >
                      <Download className="size-4" />
                      Download
                    </button>
                    <button
                      onClick={copyMemeLink}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-neon-green/50 bg-black text-white px-4 py-3 font-display uppercase text-sm font-bold hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,221,0,0.5)] transition-all"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? 'Copied' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-square rounded-lg border-2 border-dashed border-neon-green/30 flex items-center justify-center bg-black/50">
                  <p className="text-center text-gray-500 font-display text-sm">
                    Your meme will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Mode */}
        {mode === 'upload' && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col gap-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Upload Your Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neon-green/50 rounded-lg p-8 text-center cursor-pointer hover:border-neon-green transition-all bg-black/50"
                >
                  <Upload className="size-8 mx-auto mb-2 text-neon-green" />
                  <p className="text-white font-display text-sm mb-1">Click to upload or drag & drop</p>
                  <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Meme Text */}
              {uploadedImage && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      Add Text
                    </label>
                    <input
                      type="text"
                      value={uploadText}
                      onChange={(e) => {
                        setUploadText(e.target.value)
                        drawCustomMeme(uploadedImage, e.target.value)
                      }}
                      placeholder="Enter text..."
                      maxLength={50}
                      className="w-full rounded-lg border-2 border-neon-green/50 bg-black text-white p-3 font-display placeholder:text-gray-600 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(0,221,0,0.5)]"
                    />
                  </div>

                  <button
                    onClick={downloadMeme}
                    className="w-full rounded-lg border-2 border-neon-green bg-neon-green px-6 py-3 font-display text-black uppercase font-bold transition-all hover:shadow-[0_0_25px_rgba(0,221,0,0.8)]"
                  >
                    Download Meme
                  </button>
                </>
              )}
            </div>

            {/* Preview Canvas */}
            <div className="flex flex-col items-center justify-center">
              {uploadedImage ? (
                <div className="w-full">
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-lg border-2 border-neon-green shadow-[0_0_30px_rgba(0,221,0,0.5)] hidden"
                  />
                  {memeUrl && (
                    <Image
                      src={memeUrl}
                      alt="Custom meme"
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg border-2 border-neon-green shadow-[0_0_30px_rgba(0,221,0,0.5)]"
                      unoptimized
                      priority
                    />
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square rounded-lg border-2 border-dashed border-neon-green/30 flex items-center justify-center bg-black/50">
                  <p className="text-center text-gray-500 font-display text-sm">
                    Upload an image to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
