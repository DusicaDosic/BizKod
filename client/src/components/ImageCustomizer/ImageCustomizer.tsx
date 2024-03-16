import { Range } from 'react-range';

interface ImageCustomizerProps {
    id: string;
    originalWidth: number;
    originalHeight: number;
    grayscale: boolean;
    blur: number;
    onUpdateImage: (grayscale: boolean, blur: number) => void;
}

const ImageCustomizer = ({ grayscale, blur, onUpdateImage }: ImageCustomizerProps) => {

    const handleGrayscaleChange = () => {
        onUpdateImage(!grayscale, blur);
    };

    const handleBlurChange = (values: number[]) => {
        onUpdateImage(grayscale, values[0]);
    };

    return (
        <div className="sliders">
            <div className="toggle-btn-section">
                <label className={`toggle-checkbox m-vertical-auto`}>
                    <input
                        className="toggle-btn__input"
                        type="checkbox"
                        name="grayscale-switch"
                        onChange={handleGrayscaleChange}
                        checked={grayscale}
                    />
                    <span className={`toggle-btn__input-label`} />
                </label>
                <span>Grayscale</span>
            </div>
            <div>
                <label htmlFor="blur-slider">Blur:</label>
                <Range
                    step={1}
                    min={1}
                    max={10}
                    values={[blur]}
                    onChange={handleBlurChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ccc',
                                borderRadius: '3px',
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div
                                style={{
                                    height: '6px',
                                    width: '6px',
                                    backgroundColor: '#333',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default ImageCustomizer;
