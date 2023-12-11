import { Rating, RatingProps } from "@mui/material"
export interface ICustomRatingProps {
    update?: (name: string, value: any, index?: number) => void
}
export type IRating = ICustomRatingProps & RatingProps
export const RatingComponent: React.FC<IRating> = (props) => {
    const { update, name, precision = 0.5,color="#ff6347",value, ...rest } = props
    const onChange = (newValue: number | null) => {
        const val = newValue??0
        update && update(String(name), val)
    }
    return <Rating
        name={name}
        precision={precision}
        style={{ color: color }}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        {...rest}
    />
}