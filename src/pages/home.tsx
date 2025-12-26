import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Smartphone } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'

export function Home() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-24 sm:pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Beautiful React Native components
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              38+ beautifully designed components built with NativeWind (Tailwind CSS for React Native).
              <br />
              Accessible. Customizable. Open Source.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/docs/installation"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/docs/components/button"
                className="text-sm font-semibold leading-6 hover:underline"
              >
                View Components <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="pb-20 sm:pb-20">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Built for React Native
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to build great mobile apps
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Copy className="h-5 w-5 flex-none text-primary" />
                  Copy, don't install
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Components are copied into your project. You own the code. Customize it however you want.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Smartphone className="h-5 w-5 flex-none text-primary" />
                  NativeWind & Tailwind
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Built with NativeWind. Use Tailwind CSS classes in React Native. Fully typed and documented.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <svg
                    className="h-5 w-5 flex-none text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                  Accessible & Customizable
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Follows React Native accessibility best practices. Fully customizable with variants and Tailwind classes.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Installation */}
        <div className="pb-24 sm:pb-32">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Quick Start</h2>
          <CodeBlock code="npx native-shadcn-cli init" language="bash" />
          <p className="mt-4 text-sm text-muted-foreground">
            Then add components to your project:
          </p>
          <CodeBlock code="npx native-shadcn-cli add button card" language="bash" className="mt-2" />
        </div>
      </div>
    </div>
  )
}
