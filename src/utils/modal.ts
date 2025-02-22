import { useState } from "react"

export const useModal = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const setModalOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);
    }

    const setModalClosed = () => {
        setAnchorEl(null);
    }

    return {
        anchorEl,
        setModalOpen,
        setModalClosed,
    }
}