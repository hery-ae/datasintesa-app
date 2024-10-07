import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function page({ appTitle }) {
    const [data, setData] = useState<Data[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const getData = (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget as HTMLFormElement)

        const queryParams = []

        const fdk = formData.keys()

        formData.forEach(
            (value) => queryParams.push((fdk.next().value).concat('=').concat(encodeURIComponent(value as string | number | boolean)))
        )

        fetch(
            (process.env.NEXT_PUBLIC_API_URL)
            .concat('?')
            .concat('length=50')
            .concat('&')
            .concat('sort-by=_id')
            .concat('&')
            .concat('sort-direction=desc')
            .concat('&')
            .concat(queryParams.join('&'))
    )
        .then(
            (response) => {
                response.json()
                .then(
                    (value) => {
                        setIsLoading(false)

                        if (response.ok) {
                            setData(
                                value
                            )

                        } else {
                            if (Array.isArray(value.message)) value.message = value.message.join(', ')
                            setError(value.message)
                        }
                    }
                )
            }
        )
    }

    useEffect(
        () => {
            fetch(
                (process.env.NEXT_PUBLIC_API_URL)
                .concat('?')
                .concat('length=50')
                .concat('&')
                .concat('sort-by=_id')
                .concat('&')
                .concat('sort-direction=desc')
            )
            .then(
                (response) => {
                    response.json()
                    .then(
                        (value) => {
                            setIsLoading(false)

                            if (response.ok) {
                                setData(
                                    value
                                )
    
                            } else {
                                if (Array.isArray(value.message)) value.message = value.message.join(', ')
                                setError(value.message)
                            }
                        }
                    )
                }
            )
        },
        []
    )

    return (
        <>
            <Head children={<title>{appTitle}</title>} />
            <main className='px-2 mb-12'>
                <div className='mb-4 h-12'>
                    <button className='bg-blue-500 hover:bg-blue-700 border text-white py-1 px-2 rounded float-right'>
                        <Link href='/upload'>Upload</Link>
                    </button>
                </div>
                <div className='mb-4'>
                    <form onSubmit={getData}>
                        <div className='flex gap-4'>
                            <div className='grow'>
                                <input className='w-full border my-2 px-2 py-1.5 leading-tight focus:outline-none' name='enodeb-id' type='number' autoComplete='off' placeholder='Enodeb ID' />
                                <br />
                                <input className='w-full border mt-1.5 mb-2 px-2 py-1.5 leading-tight focus:outline-none' name='cell-id' type='number' autoComplete='off' placeholder='Cell ID' />
                            </div>
                            <div className='grow'>
                                <input className='w-full border my-2 px-2 py-1 leading-tight focus:outline-none' name='start-date' type='date' autoComplete='off' placeholder='Start Date' />
                                <br />
                                <input className='w-full border mt-2.5 mb-2 px-2 py-1 leading-tight focus:outline-none' name='end-date' type='date' autoComplete='off' placeholder='End Date' />
                            </div>
                            <div className='self-center w-20 text-center'>
                                <button className='bg-white hover:bg-transparent text-lg border-2 py-1 px-2 rounded' type='submit'>&#128269;</button>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    Boolean(error) && (
                        <div className='my-4' role='alert'>
                            <div className='bg-red-500 rounded-t px-4 py-2'>
                                <h3 className='text-white font-bold'>Error</h3>
                            </div>
                            <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
                                <p>{error}</p>
                            </div>
                        </div>
                        )
                }
                <div className='py-2'>
                    <table className='table-auto border-collapse border w-full'>
                        <thead>
                            <tr>
                                <th className='border-2 px-1'>Enodeb ID</th>
                                <th className='border-2 px-1'>Cell ID</th>
                                <th className='border-2 px-1'>Result Time</th>
                                <th className='border-2 px-1'>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ? (
                                    <tr>
                                        <td className='border text-center' colSpan={4}>Loading...</td>
                                    </tr>
                                ) : (
                                    data.length ? (
                                        data.map(
                                            (value, key) => (
                                                <tr key={key}>
                                                    <td className='border px-1 text-center'>{value.enodeb_id}</td>
                                                    <td className='border px-1 text-center'>{value.cell_id}</td>
                                                    <td className='border px-1 text-center'>{value.result_time}</td>
                                                    <td className='border px-1 text-end'>{value.availability}</td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td className='border text-center' colSpan={4}>No data</td>
                                        </tr>
                                    )    
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

interface Data {
    enodeb_id: number,
    cell_id: number,
    result_time: string,
    availability: number
}
