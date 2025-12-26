export const avatarTemplate = `import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof View>,
  VariantProps<typeof avatarVariants> {
  source?: { uri: string } | number;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<React.ElementRef<typeof View>, AvatarProps>(
  ({ className, size, source, alt, fallback, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    return (
      <View
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {source && !error ? (
          <Image
            source={source}
            className="h-full w-full"
            onError={() => setError(true)}
            accessibilityLabel={alt}
          />
        ) : (
          <View className="flex h-full w-full items-center justify-center bg-muted">
            <Text className="text-sm font-medium text-muted-foreground">
              {fallback || alt?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
`;
