import { useCallback, useState } from "react"

export const useModal = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const setModalOpen = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);
    }, []);
    
    const setModalClosed = useCallback(() => {
        setAnchorEl(null);
    }, [])

    return {
        anchorEl,
        setModalOpen,
        setModalClosed,
    }
}