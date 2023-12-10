import { Rating, RatingProps } from "@mui/material"
export interface ICustomRatingProps {
    update?: (name: string, value: any, index?: number) => void
}
export type IRating = ICustomRatingProps & RatingProps
export const RatingComponent: React.FC<IRating> = (props) => {
    const { update, name, precision = 0.5,color="#ff6347", ...rest } = props
    const onChange = (newValue: number | null) => {
        const value = newValue??0
        update && update(String(name), value)
    }
    return <Rating
        name={name}
        precision={precision}
        style={{ color: color }}
        onChange={(_, newValue) => onChange(newValue)}
        {...rest}
    />
}