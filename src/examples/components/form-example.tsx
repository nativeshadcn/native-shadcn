 
import { View } from 'react-native-web';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/registry/form';
import { Input } from '@/registry/input';
import { Button } from '@/registry/button';
import { useState } from 'react';

export function FormExample() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <View className="w-full max-w-md p-4">
      <Form>
        <FormField>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button className="mt-4">Submit</Button>
      </Form>
    </View>
  );
}
