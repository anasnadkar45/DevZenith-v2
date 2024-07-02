import { Card } from '@/components/ui/card'
import Error from '../../public/Unauthorized1.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
export function UnauthorizedUser({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-center min-h-[78vh] lg:min-h-[86vh]">
            <Card className="max-w-3xl mx-auto max-h-fit my-auto p-4 space-y-4">
                <Image src={Error} alt="error" className="mx-auto" width={500} height={500} />
                <h1 className="text-center">
                    {title}
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button className="" asChild>
                        <LoginLink>Login</LoginLink>
                    </Button>
                    <Button variant="secondary" asChild>
                        <RegisterLink>Register</RegisterLink>
                    </Button>
                </div>
            </Card>
        </div>
    )
}