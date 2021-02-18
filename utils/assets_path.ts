export interface ISvgPath {
    file_name:string
    folder:'avatars'|'education'|'icons'|'minimal-icons'|'zoo'
}

export const SvgPath = ({file_name,folder}:ISvgPath) => (
    `/assets/svg/${folder}/${file_name}.svg`
)