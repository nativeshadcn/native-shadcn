import * as React from 'react';
import { Switch as RNSwitch } from 'react-native';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<React.ElementRef<typeof RNSwitch>, SwitchProps>(
  ({ checked, onCheckedChange, value, onValueChange, ...props }, ref) => {
    return (
      <RNSwitch
        ref={ref}
        value={checked ?? value}
        onValueChange={onCheckedChange ?? onValueChange}
        trackColor={{ false: '#e5e7eb', true: '#86efac' }}
        thumbColor={checked || value ? '#22c55e' : '#f3f4f6'}
        {...props}
      />
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
