import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function page({ appTitle }) {
    const [data, setData] = useState<Data[]>([])
    const [error, setError] = useState('')

    const getData = (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget as HTMLFormElement)

        const queryParams = []

        const fdk = formData.keys()

        formData.forEach(
            (value) => queryParams.push((fdk.next().value).concat('=').concat(encodeURIComponent(value as string | number | boolean)))
        )

        fetch(
            (process.env.NEXT_PUBLIC_API_URL).concat('?').concat(queryParams.join('&'))
        )
        .then(
            (response) => {
                response.json()
                .then(
                    (value) => {
                        if (response.ok) {
                            setData(
                                value
                            )

                        } else {
                            setError(value.message)
                        }
                    }
                )
            }
        )
    }

    useEffect(
        () => {
            fetch(process.env.NEXT_PUBLIC_API_URL)
            .then(
                (response) => {
                    response.json()
                    .then(
                        (value) => {
                            if (response.ok) {
                                setData(
                                    value
                                )
    
                            } else {
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
                {
                    Boolean(error) && (
                        <div className='mb-4'>
                            <p className='text-red-800 text-center text-lg'>{error}</p>
                        </div>
                    )
                }
                <div className='mb-4 h-12'>
                    <button className='bg-blue-500 hover:bg-blue-700 border text-white py-1 px-2 rounded float-right'>
                        <Link href='/upload'>Upload</Link>
                    </button>
                </div>
                <div className='mb-4'>
                    <form onSubmit={getData}>
                        <div className='flex gap-4'>
                            <div className='grow'>
                                <input className='w-full border px-1 py-0.5 mb-2 leading-tight focus:outline-none' name='enodeb-id' type='number' autoComplete='off' placeholder='Enodeb ID' />
                                <br />
                                <input className='w-full border px-1 py-0.5 leading-tight focus:outline-none' name='cell-id' type='number' autoComplete='off' placeholder='Cell ID' />
                            </div>
                            <div className='grow'>
                                <input className='w-full border px-1 py-0.5 mb-2 leading-tight focus:outline-none' name='start-date' type='date' autoComplete='off' placeholder='Start Date' />
                                <br />
                                <input className='w-full border px-1 py-0.5 leading-tight focus:outline-none' name='end-date' type='date' autoComplete='off' placeholder='End Date' />
                            </div>
                            <div className='self-center w-20 text-center'>
                                <button className='bg-white hover:bg-transparent text-lg border-2 py-1 px-2 rounded' type='submit'>&#128269;</button>
                            </div>
                        </div>
                    </form>
                </div>
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
