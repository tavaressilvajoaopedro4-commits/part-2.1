import { z } from "zod"
import { BackgroundIntro } from "../../components/backgroundIntro"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useNavigate } from "react-router"

import goBack from '../../assets/goback.svg'

const forgotForm = z.object({
    email: z.string().email('E-mail inválido')
})

type ForgotForm = z.infer<typeof forgotForm>

export function Forgot() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isValid }
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotForm),
        mode: "onChange"
    })

    async function handleForgot(data: ForgotForm) {
        try {
            const res = await fetch("http://localhost:3333/password/forgot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email })
            })

            if (res.ok) {
                toast.success("E-mail de recuperação enviado")
                navigate('/forgot/send-email')
            } else if (res.status === 404) {
                toast.error("E-mail não cadastrado")
            } else {
                toast.error("Erro ao enviar o e-mail. Tente novamente.")
            }
        } catch (err) {
            toast.error("Erro de conexão. Verifique a API.")
        } finally {
            reset()
        }
    }

    function goBackPage() {
        navigate(-1)
    }

    return (
        <div className="grid min-h-screen grid-cols-5 antialiased">
            <div className="bg-background col-span-2 flex flex-col h-full items-center justify-center">
                <div className='w-[352px] relative'>
                    <button className="absolute left-0 cursor-pointer mt-[-100px]" onClick={goBackPage}>
                        <img src={goBack} alt="Seta para voltar" className="w-8 h-12" />
                    </button>

                    <div className='flex flex-col justify-center gap-6'>
                        <h1 className='text-3xl font-poppins-semibold text-text-title'>Eita, esqueceu sua senha?</h1>
                        <h3 className="text-base font-poppins-regular text-text-base">
                            Não esquenta, vamos dar um jeito nisso.
                        </h3>

                        <form onSubmit={handleSubmit(handleForgot)}>
                            <Input
                                type="email"
                                id="email"
                                placeholder="E-mail"
                                rounded="top"
                                register={register}
                                error={errors.email}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                title={isSubmitting ? "Enviando..." : "Enviar"}
                            />
                        </form>
                    </div>
                </div>
            </div>

            <BackgroundIntro />
        </div>
    )
}
