import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { sliderTemplate } from '@templates/slider'

function SliderPreview() {
  const [volume, setVolume] = useState(60)
  const [brightness, setBrightness] = useState(30)

  return (
    <div className="flex flex-col gap-6 p-8 w-full max-w-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">Volume: {volume}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--secondary)) ${volume}%, hsl(var(--secondary)) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Brightness: {brightness}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${brightness}%, hsl(var(--secondary)) ${brightness}%, hsl(var(--secondary)) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  )
}

export function SliderDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Slider</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          An input where the user selects a value from within a given range.
        </p>
      </div>

      <ComponentPreview
        name="Slider"
        preview={<SliderPreview />}
        code={`import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const [volume, setVolume] = useState(60);
const [brightness, setBrightness] = useState(30);

<View className="gap-6">
  <View className="gap-2">
    <Text className="font-medium">Volume: {volume}%</Text>
    <Slider
      value={volume}
      onValueChange={setVolume}
      min={0}
      max={100}
      step={1}
    />
  </View>
  <View className="gap-2">
    <Text className="font-medium">Brightness: {brightness}%</Text>
    <Slider
      value={brightness}
      onValueChange={setBrightness}
      min={0}
      max={100}
      step={1}
    />
  </View>
</View>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add slider"
        manual={sliderTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Slider } from '@/components/ui/slider';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Slider value={value} onValueChange={setValue} min={0} max={100} />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
