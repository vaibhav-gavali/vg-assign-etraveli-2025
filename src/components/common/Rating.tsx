import Row from './Row';

interface Props {
    value: number;
    total?: number;
    readOnly?: boolean;
    onChange?: (value: number) => string;
}

const Rating = (props: Props) => {
    const { value, total = 5, readOnly = true, onChange } = props;

    const handleClick = (index: number) => {
        if (!readOnly && onChange) {
            onChange(index + 1)
        }
    }

    return (
        <Row styles={{ gap: '2px', cursor: readOnly ? 'default' : 'pointer' }}>
            {Array.from({ length: total }).map((_, index) => {
                return (
                    <span key={index}
                        onClick={() => handleClick(index)}
                        style={{ color: index < value ? 'gold' : 'gray', fontSize: '16px' }}>
                        ★
                    </span>
                );
            })}
        </Row>
    )
}

export default Rating