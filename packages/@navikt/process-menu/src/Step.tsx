import bem from '@navikt/nap-bem-utils';
import classnames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import './stepStyles';
import StepIcon from './StepIcon';

export enum StepType {
    warning = 'warning',
    success = 'success',
    danger = 'danger',
    default = 'default',
}

interface StepProps {
    label: string;
    index: number;
    isFinished?: boolean;
    isActive?: boolean;
    type?: StepType;
    onClick?: (index: number) => void;
    iconAltText?: string;
}

const stepCls = bem('step');

export const Step = React.memo(
    ({ label, index, isActive, onClick, isFinished, type = StepType.default, iconAltText }: StepProps): JSX.Element => {
        const handleButtonClick = (event: React.FormEvent<HTMLButtonElement>): void => {
            event.preventDefault();
            onClick(index);
        };

        const stepIndicatorCls = classnames(stepCls.elementWithModifier('indicator', type), {
            [stepCls.elementWithModifier('indicator', 'active')]: isActive,
        });

        return (
            <li key={label.split(' ').join('')} className={stepCls.block} aria-current={isActive ? 'step' : undefined}>
                <button
                    className={isActive ? stepCls.elementWithModifier('button', 'active') : stepCls.element('button')}
                    type="button"
                    onClick={handleButtonClick}
                    data-tooltip={label}
                >
                    <span className={stepCls.element('text-icon-container')}>
                        <StepIcon type={type} isFinished={isFinished} iconAltText={iconAltText} />
                        <Normaltekst tag="span">{label}</Normaltekst>
                    </span>
                    <span className={stepIndicatorCls} />
                </button>
                {isActive && (
                    <div className={stepCls.element('arrow-container')}>
                        <div className={stepCls.element('arrow')} />
                    </div>
                )}
            </li>
        );
    }
);
export default Step;
