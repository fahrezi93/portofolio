"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StarBorder from "./StarBorder";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { motion } from "framer-motion";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const serviceId = 'fahrezi_email';
    const templateId = 'template_w86l3fj';
    const publicKey = 'KhbqXgjDEduLsAKJW';

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
      reply_to: values.email,
      to_name: 'Fahrezi'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting me. I will get back to you soon.",
          variant: "default"
        });
        form.reset();
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast({
          title: "Failed to Send",
          description: "Sorry, an error occurred while sending the message. Please try again later.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section id="contact" className="w-full bg-[#0B1121] py-24 md:py-32 relative overflow-hidden">
      {/* Refined Background: Pure & Minimal */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-32 items-start">

            {/* Left: Editorial Content */}
            <div className="space-y-16">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-[11px] font-medium tracking-[0.3em] text-blue-400/80 uppercase">Available for projects</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]"
                >
                  Let's start <br />
                  <span className="italic font-serif">something</span> <br />
                  remarkable.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-500 max-w-sm leading-relaxed font-light"
                >
                  {t.contact_subtitle || "Currently seeking new challenges. Whether you have a specific project or just want to say hi, I'm all ears."}
                </motion.p>
              </div>

              {/* Minimalist Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4 pt-8 border-t border-white/5"
              >
                <p className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">Based in</p>
                <p className="text-white/60 font-light italic">Indonesia, GMT+7</p>
              </motion.div>
            </div>

            {/* Right: Refined Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-12"
                >
                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex justify-between items-end">
                            <FormLabel className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">01 / Full Name</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Fahri"
                              {...field}
                              className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-white/40 h-14 rounded-none px-0 transition-all text-xl font-light"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-[10px] tracking-widest uppercase mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex justify-between items-end">
                            <FormLabel className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">02 / Email</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="hello@example.com"
                              {...field}
                              className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-white/40 h-14 rounded-none px-0 transition-all text-xl font-light"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-[10px] tracking-widest uppercase mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex justify-between items-end">
                            <FormLabel className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">03 / Message</FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your vision..."
                              className="resize-none bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-white/40 rounded-none p-0 transition-all text-xl font-light min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-[10px] tracking-widest uppercase mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex items-center justify-center gap-4 bg-white text-black hover:bg-blue-500 hover:text-white h-14 w-full md:w-[280px] rounded-full font-medium transition-all duration-500 ease-in-out shadow-lg shadow-white/5"
                    >
                      <span className="text-xs tracking-[0.2em] uppercase">
                        {isSubmitting ? "Dispatching..." : "Send Message"}
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

  );
}
