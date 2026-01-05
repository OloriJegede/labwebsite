'use client'

import { usePathname } from 'next/navigation'
import AppHeader from '@/components/Headers/AppHeader'

export default function ConditionalHeader() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  
  if (isAdminRoute) return null
  
  return <AppHeader />
}