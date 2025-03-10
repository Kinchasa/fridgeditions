"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MetallicFridgeSvg } from "./metallic-fridge-svg"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ArtworkCardProps {
  title: string
  artist: string
  image: string
  id: number | string
  description?: string
}

export function ArtworkCard({ title, artist, image, id, description }: ArtworkCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Generate random price from standard options
  const priceOptions = ["Free", "$0.50", "$1.00", "$5.00"]
  const price = priceOptions[Math.floor(Math.random() * priceOptions.length)]

  // Generate random edition data
  const totalEditions = [1, 3, 5, 10, 25][Math.floor(Math.random() * 5)]
  const remainingEditions = Math.max(1, Math.floor(Math.random() * (totalEditions + 1)))

  // Generate a description if none provided
  const artDescription =
    description ||
    `This wonderful piece by ${artist} captures the imagination and creativity of youth. Each stroke tells a story of wonder and possibility.`

  const incrementQuantity = () => {
    if (quantity < remainingEditions) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= remainingEditions) {
      setQuantity(value)
    }
  }

  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-shadow">
        {/* Metallic fridge background */}
        <MetallicFridgeSvg />

        {/* Artwork image */}
        <div className="absolute inset-0 z-10 p-6">
          <div className="relative h-full w-full">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
          </div>
        </div>

        {/* Subtle reflection overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/5 to-transparent opacity-50" />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">by {artist}</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="transition-opacity hover:bg-primary/10">
              Collect
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Collect "{title}"</DialogTitle>
              <DialogDescription>Support {artist}'s creativity by collecting this artwork.</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg border shadow-sm w-full max-w-xs mx-auto">
                <MetallicFridgeSvg />
                <div className="absolute inset-0 z-10 p-6">
                  <div className="relative h-full w-full">
                    <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price:</span>
                  <span className="text-lg font-bold">{price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Editions:</span>
                  <span>
                    {remainingEditions} of {totalEditions} remaining
                  </span>
                </div>

                <div className="pt-2">
                  <Label htmlFor="quantity">Quantity to collect:</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <span className="sr-only">Decrease</span>
                      <span className="text-lg">-</span>
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={remainingEditions}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= remainingEditions}
                    >
                      <span className="sr-only">Increase</span>
                      <span className="text-lg">+</span>
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-medium mb-1">About this artwork:</h4>
                  <p className="text-sm text-muted-foreground">{artDescription}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button>{price === "Free" ? "Collect Now" : `Purchase (${price})`}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

