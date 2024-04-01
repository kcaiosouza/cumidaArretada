import { api } from "@/services/api";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function Login() {
    const { register, handleSubmit } = useForm();
    return(
        <form onSubmit={handleSubmit(async (data) => { var result = await api.post("/user/login", {cpf: data.cpf}); console.log(result)})}>
            <label>CPF</label>
            <InputMask {...register("cpf")} mask={"999.999.999-99"} maskChar="" />

            <input type="submit" value="Enviar" />
        </form>
    )
}