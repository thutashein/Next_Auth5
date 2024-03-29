"use client"

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from '@/schemas';
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Login } from '@/actions/login';

const LoginForm = () => {
  const [isError,setError] = useState<string | undefined>("");
  const [isSuccess,setSuccess] = useState<string | undefined>("");

  const [isPending,startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit =(values: z.infer<typeof LoginSchema>) =>{
    setError("");
    setSuccess("");
      startTransition(()=>{
        Login(values)
        .then((data)=>{
          setError(data.error);
          setSuccess(data.success);
        });
      })
  }

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.done@example.com" {...field} 
                    disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} 
                    disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormError message={isError}/>
          <FormSuccess message={isSuccess}/>

          <Button type='submit' className='w-full' disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm