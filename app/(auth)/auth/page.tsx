"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from '@/components/ui/UI';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/authStore';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SEO } from '@/components/common/SEO';

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().optional()
});

type AuthFormData = z.infer<typeof authSchema>;

export default function Auth() {
  const [view, setView] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useRouter();
  const { initialize } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });

  const toggleView = (newView: "login" | "signup") => {
    setView(newView);
    setError(null);
    setSuccess(null);
    reset();
  };

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (view === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: { full_name: data.fullName }
          }
        });

        if (signUpError) throw signUpError;
        setSuccess("Account created successfully! You can now sign in.");
        toggleView("login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (signInError) throw signInError;
        await initialize(); // Load user profile into store
        navigate("/account"); // Redirect to account dashboard
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-[80px] bg-[#F4F4F4] px-6">
      <SEO title={view === 'login' ? "Sign In" : "Create Account"} />
      <div className="bg-white p-8 md:p-12 border border-[#E8E8E8] shadow-sm w-full max-w-[440px]">
        
        <div className="text-center mb-8">
          <h1 className="font-['Cormorant_Garamond'] text-3xl mb-2">
            {view === "login" && "Welcome Back"}
            {view === "signup" && "Create Account"}
          </h1>
          <p className="font-['Jost'] text-sm text-[#6B6B6B]">
            {view === "login" && "Enter your details to access your account."}
            {view === "signup" && "Join the inner circle."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-['Jost']">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 text-sm font-['Jost']">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {view === "signup" && (
            <div className="space-y-1">
              <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Full Name</label>
              <input 
                {...register("fullName")}
                type="text" 
                className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost']`} 
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Email</label>
            <input 
              {...register("email")}
              type="email" 
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost']`} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Password</label>
              {view === "login" && (
                <button type="button" className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] underline">Forgot?</button>
              )}
            </div>
            <input 
              {...register("password")}
              type="password" 
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost']`} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : (view === "login" ? "Sign In" : "Create Account")}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm font-['Jost'] text-[#6B6B6B]">
          {view === "login" ? (
            <>Don't have an account? <button type="button" onClick={() => toggleView("signup")} className="text-[#1A1A1A] underline ml-1">Create one</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => toggleView("login")} className="text-[#1A1A1A] underline ml-1">Sign In</button></>
          )}
        </div>

      </div>
    </div>
  );
}
