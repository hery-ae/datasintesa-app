import { useState } from 'react'
import Head from 'next/head'

export default function upload({ appTitle }) {
    const [error, setError] = useState<string>('')

    const fileUpload = (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        const btn = event.currentTarget.getElementsByTagName('button').item(0)
        btn.disabled = true

        const formData = new FormData(event.currentTarget as HTMLFormElement)

        fetch(
            process.env.NEXT_PUBLIC_API_URL,
            {
                method: 'POST',
                body: formData
            }
        )
        .then(
            (response) => {
                response.json()
                .then(
                    (value) => {
                        btn.disabled = false

                        if (response.ok) {
                            window.location.replace('.')

                        } else {
                            if (Array.isArray(value.message)) value.message = value.message.join(', ')
                            setError(value.message)
                        }
                    }
                )
            }
        )
    }

    return (
        <>
            <Head children={<title>Upload - {appTitle}</title>} />
            <main className='px-2 mb-12'>
                <div className='mb-10'>
                    <h1 className='text-xl font-semibold'>Upload Page</h1>
                </div>
                {
                    Boolean(error) && (
                        <div className='mb-8 w-64 max-w-full mx-auto' role='alert'>
                            <div className='bg-red-500 rounded-t px-4 py-2'>
                                <h3 className='text-white font-bold'>Error</h3>
                            </div>
                            <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
                                <p>{error}</p>
                            </div>
                        </div>
                        )
                }
                <div className='mb-4'>
                    <form className='text-center' onSubmit={fileUpload}>
                        <input className='w-64 max-w-full border-2 rounded bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 focus:outline-none' name='file' accept='text/csv' type='file' />
                        <br />
                        <button className='bg-blue-500 hover:bg-blue-700 border text-white text-xl my-10 py-2 px-4 rounded disabled:bg-transparent disabled:text-blue-500' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
