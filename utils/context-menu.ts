export const DefaultEventComportamentOnContextMenuOpen = (event:MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
}