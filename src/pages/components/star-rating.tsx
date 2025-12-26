import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { starRatingTemplate } from '@templates/star-rating'

function StarRatingPreview() {
  const [rating, setRating] = useState(3)

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-3xl transition-colors"
          >
            {star <= rating ? (
              <span className="text-yellow-500">★</span>
            ) : (
              <span className="text-muted">☆</span>
            )}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Rating: {rating} / 5
      </p>
    </div>
  )
}

export function StarRatingDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Star Rating</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A customizable star rating component for display and input.
        </p>
      </div>
      <ComponentPreview
        name="Star Rating"
        preview={<StarRatingPreview />}
        code={`import { StarRating } from '@/components/ui/star-rating';

const [rating, setRating] = useState(3);

// Interactive rating
<StarRating 
  value={rating} 
  onValueChange={setRating}
  max={5}
/>

// Read-only rating
<StarRating 
  value={4.5} 
  readOnly
  max={5}
  size="lg"
/>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add star-rating"
        manual={starRatingTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { StarRating } from '@/components/ui/star-rating';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<StarRating
  value={rating}
  onValueChange={setRating}
  max={5}
/>`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Interactive and read-only modes</li>
          <li>Customizable star count</li>
          <li>Multiple size variants (sm, md, lg)</li>
          <li>Half-star support for decimal ratings</li>
          <li>Fully accessible</li>
        </ul>
      </div>
    </div>
  )
}
