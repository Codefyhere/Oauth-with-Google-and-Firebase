import './globals.css'

export const metadata = {
  title: 'Oauth | Codefy',
  description: 'Developed by codefy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-900 text-white flex items-center justify-center h-screen'>{children}</body>
    </html>
  )
}
