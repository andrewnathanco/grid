import { createEffect, createSignal } from "solid-js";

export default function useIsMobile() {
    const [mobile, setMobile] = createSignal(false);

    createEffect(() => {
        if (navigator) {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            setMobile(isMobile)
        }
    })

    return mobile;
}