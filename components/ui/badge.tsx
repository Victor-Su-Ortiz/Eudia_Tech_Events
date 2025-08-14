import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-euclid',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-eudia-primary text-white hover:bg-eudia-primary-dark',
        secondary:
          'border-transparent bg-eudia-bg-light text-eudia-text hover:bg-eudia-bg-light/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-eudia-text/20 text-eudia-text hover:bg-eudia-bg-light',
        teal: 'border-transparent bg-eudia-teal text-white hover:bg-eudia-teal/90',
        mint: 'border-transparent bg-eudia-mint text-eudia-text hover:bg-eudia-mint/90',
        coral: 'border-transparent bg-eudia-coral text-white hover:bg-eudia-coral/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
