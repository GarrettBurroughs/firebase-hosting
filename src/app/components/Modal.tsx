import { PropsWithChildren } from "react"
import styles from "./modal.module.css"

interface ModalProps extends PropsWithChildren {
    showModal: boolean;
}


export const Modal: React.FunctionComponent<ModalProps> = ({children, showModal}) => {
    if (!showModal) return <></>;
    return <>
        <div className={styles.modalBackdrop}></div>;
        <div className={styles.modal}>{children}</div>;
    </>
}