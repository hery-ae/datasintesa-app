import { useState } from 'react'
import Head from 'next/head'

export default function upload({ appTitle }) {
    const [error, setError] = useState('')

    const fileUpload = (event: React.FormEvent) => {
        event.preventDefault()

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
                        if (response.ok) {
                            window.location.replace('.')

                        } else {
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
            <main className='px-2 mb-64'>
                <div className='mb-10'>
                    <h1 className='text-xl font-semibold'>Upload Page</h1>
                </div>
                {
                    Boolean(error) && (
                        <div className='mb-4'>
                            <p className='text-red-800 text-center text-lg'>{error}</p>
                        </div>
                    )
                }
                <div className='mb-4'>
                    <form className='text-center' onSubmit={fileUpload}>
                        <input className='w-64 max-w-full border-2 rounded bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 focus:outline-none' name='file' accept='text/csv' type='file' />
                        <br />
                        <button className='bg-blue-500 hover:bg-blue-700 border text-white text-xl my-10 py-2 px-4 rounded' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
