import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { carouselTemplate } from '@templates/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function CarouselPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, color: 'from-blue-500 to-purple-500' },
    { id: 2, color: 'from-purple-500 to-pink-500' },
    { id: 3, color: 'from-pink-500 to-red-500' },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-4">
        <div className="relative overflow-hidden rounded-lg border border-border">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: 'translateX(-' + (currentSlide * 100) + '%)' }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={'h-48 w-full flex-shrink-0 bg-gradient-to-r ' + slide.color + ' flex items-center justify-center text-white text-2xl font-bold'}
              >
                Slide {slide.id}
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center disabled:opacity-50 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center disabled:opacity-50 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={'h-2 rounded-full transition-all ' + (
                index === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-muted'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CarouselDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Carousel</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A composable carousel component with Context API for displaying images, cards, or any custom content.
        </p>
      </div>
      <ComponentPreview
        name="Carousel"
        preview={<CarouselPreview />}
        code={`import { Carousel, CarouselContent, CarouselItem, CarouselPagination, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { View, Text } from 'react-native';
// For icons, you can use react-native-vector-icons, expo-vector-icons, or lucide-react-native
// import { ChevronLeft, ChevronRight } from 'lucide-react-native';

<Carousel itemWidth={300}>
  <CarouselContent>
    <CarouselItem>
      <View className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg items-center justify-center">
        <Text className="text-2xl font-bold text-white">Slide 1</Text>
      </View>
    </CarouselItem>
    <CarouselItem>
      <View className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg items-center justify-center">
        <Text className="text-2xl font-bold text-white">Slide 2</Text>
      </View>
    </CarouselItem>
    <CarouselItem>
      <View className="h-48 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg items-center justify-center">
        <Text className="text-2xl font-bold text-white">Slide 3</Text>
      </View>
    </CarouselItem>
  </CarouselContent>
  <CarouselPagination />
  {/* Use default text or pass icons as children */}
  <CarouselPrevious>{/* <ChevronLeft size={20} color="currentColor" /> */}</CarouselPrevious>
  <CarouselNext>{/* <ChevronRight size={20} color="currentColor" /> */}</CarouselNext>
</Carousel>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add carousel"
        manual={carouselTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Carousel>
  <CarouselContent>
    <CarouselItem>{/* Item 1 */}</CarouselItem>
    <CarouselItem>{/* Item 2 */}</CarouselItem>
    <CarouselItem>{/* Item 3 */}</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Fully composable with Context API</li>
          <li>Customizable pagination (dots, lines, numbers)</li>
          <li>Previous/Next navigation buttons</li>
          <li>Auto-play with configurable interval</li>
          <li>Loop support</li>
          <li>Custom item width</li>
        </ul>
      </div>
    </div>
  )
}
