'use client';

import { useSession } from "next-auth/react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const page = () => {

  const { data: session } = useSession();
  const pathname = usePathname();
  const username = pathname.split("/u/")[1]


  const router = useRouter()
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  })


  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {

      //TODO
      const payload = {
        username,
        content: data.content
      }
      console.log('data to be sent to send-message :', payload);
      const response = await axios.post<ApiResponse>('/api/send-message', payload);
      toast('message sent successfully to user', {
        description: response.data.message
      })
      router.replace('/') // sending message sender to home page

    } catch (error) {

      console.error(" Error while sending message to user ", error)

      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message

      toast('Error while sending message to user', {
        description: errorMessage
      })

    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Public Profile Link
          </h1>
          <p className="mb-4">Send Anonymous message to @{username}</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />




            <Button type="submit" >
              Send it
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Want to create your own feedback like @{username}?{' '}

            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>

          </p>
        </div>
      </div>
    </div >

  );
}


export default page

// <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//   <h1 className="text-4xl font-bold mb-4 text-center">
//     Public Profile Link
//   </h1>

//   <div className="mb-4 mt-4" >
//     <h2 className="text-lg font-semibold mb-2">
//       Send Anonymous message to @{username}
//     </h2>{' '}
//   </div>

// </div>