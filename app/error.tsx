'use client';
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex items-center justify-center" style={{height: "calc(100vh - 248px)"}}>
      <div>
        <h2 className='text-3xl'>Something went wrong</h2>
        <button
          onClick={
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}