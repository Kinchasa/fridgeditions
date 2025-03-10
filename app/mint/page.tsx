"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetallicFridgeSvg } from "@/components/metallic-fridge-svg"

export default function MintPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [mintOption, setMintOption] = useState("base")
  const [priceOption, setPriceOption] = useState("free")
  const [customPrice, setCustomPrice] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomPrice(value)
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        processFile(file)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">Add Your Art</h1>
          <p className="text-muted-foreground mb-8">
            Transform your child's masterpiece into a digital collectible that lasts forever.
          </p>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" onClick={() => setPreviewMode(false)}>
                Upload & Details
              </TabsTrigger>
              <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Artwork</CardTitle>
                  <CardDescription>Choose an image file of your child's artwork to mint as an NFT.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="artwork">Artwork Image</Label>
                    <Input
                      id="artwork"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/25 hover:border-primary/50"
                      }`}
                      onClick={handleButtonClick}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {selectedImage ? (
                        <div className="space-y-3">
                          <div className="w-32 h-32 mx-auto relative">
                            <Image
                              src={selectedImage || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">File selected. Click or drag to replace.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-muted-foreground">Drag and drop an image here, or click to select</p>
                          <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="title">Artwork Title</Label>
                    <Input id="title" placeholder="My Awesome Drawing" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="artist">Artist Name</Label>
                    <Input id="artist" placeholder="Emma" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="age">Artist Age (Optional)</Label>
                    <Input id="age" type="number" min="1" max="18" placeholder="7" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Tell us about this masterpiece..." rows={3} />
                  </div>

                  {/* Pricing Options */}
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Listing Price</Label>
                    <RadioGroup value={priceOption} onValueChange={setPriceOption} className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="free" id="free" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="free" className="font-medium">
                            Free
                          </Label>
                          <p className="text-sm text-muted-foreground">Enjoy 😊!</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="fifty-cents" id="fifty-cents" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="fifty-cents" className="font-medium">
                            $0.50
                          </Label>
                          <p className="text-sm text-muted-foreground">Coin for Candy</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="one-dollar" id="one-dollar" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="one-dollar" className="font-medium">
                            $1.00
                          </Label>
                          <p className="text-sm text-muted-foreground">By George!</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="five-dollars" id="five-dollars" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="five-dollars" className="font-medium">
                            $5.00
                          </Label>
                          <p className="text-sm text-muted-foreground">Gadzooks!</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="custom" id="custom" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="custom" className="font-medium">
                              Custom
                            </Label>
                            <div className="flex items-center">
                              <span className="mr-1">$</span>
                              <Input
                                id="custom-price"
                                value={customPrice}
                                onChange={handleCustomPriceChange}
                                placeholder="0.00"
                                className="w-20 h-8"
                                onClick={() => setPriceOption("custom")}
                              />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {priceOption === "custom" ? "Don't cut yourself short" : "Set your own price"}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Quantity Options */}
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Edition Quantity</Label>
                    <RadioGroup defaultValue="one" className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="one" id="one" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="one" className="font-medium">
                            Just One
                          </Label>
                          <p className="text-sm text-muted-foreground">It's that special</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="three" id="three" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="three" className="font-medium">
                            Three
                          </Label>
                          <p className="text-sm text-muted-foreground">Still exclusive</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="five" id="five" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="five" className="font-medium">
                            High Five
                          </Label>
                          <p className="text-sm text-muted-foreground">Up top, down low</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="ten" id="ten" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="ten" className="font-medium">
                            Ten Editions
                          </Label>
                          <p className="text-sm text-muted-foreground">Spread the Love</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="custom-quantity" id="custom-quantity" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="custom-quantity" className="font-medium">
                              Custom
                            </Label>
                            <Input
                              id="custom-quantity-input"
                              type="number"
                              min="1"
                              max="100"
                              placeholder="1"
                              className="w-20 h-8"
                              onClick={() => document.getElementById("custom-quantity")?.click()}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">Set your own quantity</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="consent" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="consent" className="text-sm font-medium leading-none">
                        Parental Consent
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I confirm I am at least 13 years old or have parental permission.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setPreviewMode(true)}>
                    Preview
                  </Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Preview Your NFT</CardTitle>
                  <CardDescription>This is how your artwork will appear in the Fridgeditions gallery.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-full max-w-md mx-auto">
                    {selectedImage ? (
                      <div className="aspect-[3/4] relative overflow-hidden rounded-lg border bg-card shadow-sm">
                        <MetallicFridgeSvg />
                        <div className="absolute inset-0 z-10 p-4">
                          <Image
                            src={selectedImage || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[3/4] flex items-center justify-center rounded-lg border bg-card shadow-sm">
                        <MetallicFridgeSvg />
                        <p className="text-muted-foreground z-10">Upload an image to see preview</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setPreviewMode(false)}>
                    Back to Edit
                  </Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

