import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../Utils/formateCurrency';

const MIN_MONTHLY = 1000;
const MAX_MONTHLY = 200000;
const QUICK_AMOUNTS = [5000, 10000, 21000];

function snapToThousand(n) {
    const num = Math.round(Number(n) || 0);
    const snapped = Math.round(num / 1000) * 1000;
    return Math.min(MAX_MONTHLY, Math.max(MIN_MONTHLY, snapped));
}

const PlanEnrollment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialPlan = location.state?.plan === 'icon' ? 'icon' : 'edge';

    const [plan, setPlan] = useState(initialPlan);
    const [monthly, setMonthly] = useState(3000);
    const [inputText, setInputText] = useState('3000');
    const [appreciationPct, setAppreciationPct] = useState(5);

    useEffect(() => {
        if (location.state?.plan === 'edge' || location.state?.plan === 'icon') {
            setPlan(location.state.plan);
        }
    }, [location.state?.plan]);

    const rawDigits = inputText.replace(/[^\d]/g, '');
    const parsedInput =
        rawDigits === '' ? null : Number(rawDigits);
    const activeMonthly =
        parsedInput !== null && !Number.isNaN(parsedInput)
            ? Math.min(MAX_MONTHLY, Math.max(MIN_MONTHLY, parsedInput))
            : monthly;

    const totalNine = activeMonthly * 9;
    const bonus = activeMonthly;
    const baseWithBonus = totalNine + bonus;
    const appreciationAmount =
        plan === 'edge' ? Math.round(totalNine * (appreciationPct / 100)) : 0;
    const estimatedTotal =
        plan === 'edge' ? baseWithBonus + appreciationAmount : activeMonthly * 10;

    const handleMonthlyInputChange = (e) => {
        const raw = e.target.value.replace(/[^\d]/g, '');
        setInputText(raw);
    };

    const commitMonthlyFromInput = () => {
        const n = inputText === '' ? MIN_MONTHLY : Number(inputText);
        const snapped = snapToThousand(Number.isNaN(n) ? MIN_MONTHLY : n);
        setMonthly(snapped);
        setInputText(String(snapped));
    };

    useEffect(() => {
        setInputText(String(monthly));
    }, [monthly]);

    const planTitle =
        plan === 'edge' ? 'Treasure Chest Edge' : 'Treasure Chest Icon';

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div className="bg-white py-3 border-bottom shadow-sm">
                <div className="container d-flex align-items-center justify-content-between px-3 px-md-4">
                    <div className="d-flex align-items-center gap-2 gap-md-3">
                        <button
                            type="button"
                            className="btn btn-light rounded-circle"
                            onClick={() => navigate(-1)}
                            aria-label="Go back"
                        >
                            <i className="ri-arrow-left-line fs-5" />
                        </button>
                        <h5
                            className="mb-0 fw-bold d-none d-md-block"
                            style={{ color: '#4F3267' }}
                        >
                            Treasure Chest
                        </h5>
                    </div>

                    <div
                        className="d-flex align-items-center flex-grow-1 justify-content-center px-2"
                        style={{ maxWidth: '520px' }}
                    >
                        <div className="d-flex align-items-center w-100" style={{ fontSize: '11px', fontWeight: 600 }}>
                            <div className="d-flex align-items-center gap-1 text-nowrap" style={{ color: '#4F3267' }}>
                                <span
                                    className="rounded-circle flex-shrink-0"
                                    style={{
                                        width: 8,
                                        height: 8,
                                        backgroundColor: '#8B5CF6',
                                    }}
                                />
                                <span className="d-none d-sm-inline">Choose Your Plan</span>
                                <span className="d-sm-none">Plan</span>
                            </div>
                            <div
                                className="flex-grow-1 mx-1 mx-sm-2"
                                style={{ height: 2, backgroundColor: '#8B5CF6', minWidth: '12px' }}
                            />
                            <div className="d-flex align-items-center gap-1 text-muted text-nowrap">
                                <span
                                    className="rounded-circle flex-shrink-0"
                                    style={{ width: 8, height: 8, border: '1px solid #ccc', backgroundColor: '#fff' }}
                                />
                                <span className="d-none d-sm-inline">Enter Account Details</span>
                                <span className="d-sm-none">Account</span>
                            </div>
                            <div
                                className="flex-grow-1 mx-1 mx-sm-2"
                                style={{ height: 2, backgroundColor: '#e5e5e5', minWidth: '12px' }}
                            />
                            <div className="d-flex align-items-center gap-1 text-muted text-nowrap">
                                <span
                                    className="rounded-circle flex-shrink-0"
                                    style={{ width: 8, height: 8, border: '1px solid #ccc', backgroundColor: '#fff' }}
                                />
                                <span className="d-none d-sm-inline">Select Payment</span>
                                <span className="d-sm-none">Pay</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: 40 }} className="d-none d-sm-block" />
                </div>
            </div>

            <div className="container py-4 px-3" style={{ maxWidth: 560 }}>
                <div
                    className="p-3 p-md-4 rounded-4 mb-4 d-flex justify-content-between align-items-start"
                    style={{ border: '1px solid #e9d5ff', backgroundColor: '#fff' }}
                >
                    <div>
                        <div className="small text-muted mb-1">Selected Plan</div>
                        <div className="fw-bold" style={{ color: '#4F3267', fontSize: '1.05rem' }}>
                            {planTitle}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none fw-semibold small"
                        style={{ color: '#8B5CF6' }}
                        onClick={() => setPlan((p) => (p === 'edge' ? 'icon' : 'edge'))}
                    >
                        Switch to {plan === 'edge' ? 'ICON' : 'EDGE'}
                    </button>
                </div>

                <label className="d-block small fw-semibold mb-2" style={{ color: '#8B5CF6' }}>
                    Monthly Instalment (Multiples of ₹1,000 only)
                </label>
                <div
                    className="rounded-4 p-3 p-md-4 mb-3"
                    style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff' }}
                >
                    <div className="d-flex align-items-center">
                        <span className="fw-bold me-1" style={{ color: '#4F3267', fontSize: '1.35rem' }}>
                            ₹
                        </span>
                        <input
                            type="text"
                            inputMode="numeric"
                            className="border-0 bg-transparent fw-bold flex-grow-1"
                            style={{ color: '#4F3267', fontSize: '1.35rem', outline: 'none', minWidth: 0 }}
                            value={inputText}
                            onChange={handleMonthlyInputChange}
                            onBlur={commitMonthlyFromInput}
                        />
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mb-4">
                    {QUICK_AMOUNTS.map((amt) => (
                        <button
                            key={amt}
                            type="button"
                            className="btn rounded-pill px-3 py-2 small fw-semibold"
                            style={{
                                backgroundColor: activeMonthly === amt ? '#ddd6fe' : '#f3e8ff',
                                color: '#4F3267',
                                border: '1px solid #e9d5ff',
                            }}
                            onClick={() => {
                                setMonthly(amt);
                                setInputText(String(amt));
                            }}
                        >
                            {formatCurrency(amt)}
                        </button>
                    ))}
                </div>

                <div
                    className="p-3 p-md-4 rounded-4 mb-4"
                    style={{ border: '1px solid #e9d5ff', backgroundColor: '#fff' }}
                >
                    <div className="d-flex justify-content-between align-items-start mb-3 small">
                        <span className="text-muted pe-2">Your Total Instalments (9 Months)</span>
                        <span className="fw-semibold text-nowrap" style={{ color: '#4F3267' }}>
                            {formatCurrency(totalNine)}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-3 small">
                        <span className="text-muted pe-2">Salt &amp; Glitz Discount (10th Month)</span>
                        <span className="fw-semibold text-nowrap" style={{ color: '#8B5CF6' }}>
                            +{formatCurrency(bonus)}
                        </span>
                    </div>

                    {plan === 'edge' && (
                        <>
                            <div className="d-flex justify-content-between align-items-start mb-2 small">
                                <span className="text-muted pe-2">
                                    Gold Value Appreciation (Adjust the slider to see potential returns)
                                </span>
                                <span className="fw-semibold text-nowrap" style={{ color: '#8B5CF6' }}>
                                    {formatCurrency(appreciationAmount)} ({appreciationPct}%)
                                </span>
                            </div>
                            <input
                                type="range"
                                className="form-range mb-3"
                                min={0}
                                max={15}
                                step={1}
                                value={appreciationPct}
                                onChange={(e) => setAppreciationPct(Number(e.target.value))}
                                style={{ accentColor: '#8B5CF6' }}
                            />
                        </>
                    )}

                    <hr className="my-3 opacity-25" />

                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold" style={{ color: '#4F3267' }}>
                            Estimated Total Redeemable Amount
                        </span>
                        <span className="fw-bold text-nowrap" style={{ color: '#4F3267' }}>
                            {formatCurrency(estimatedTotal)}
                        </span>
                    </div>

                    {plan === 'edge' ? (
                        <p className="small text-muted mb-3 mb-md-0">
                            Your {formatCurrency(baseWithBonus)} (incl. bonus) could grow to{' '}
                            {formatCurrency(estimatedTotal)} at {appreciationPct}% growth
                        </p>
                    ) : (
                        <p className="small text-muted mb-3 mb-md-0">
                            Your {formatCurrency(totalNine)} paid over 9 months plus{' '}
                            {formatCurrency(bonus)} bonus totals {formatCurrency(estimatedTotal)}.
                        </p>
                    )}

                    <div
                        className="d-flex gap-2 p-3 rounded-3 small text-muted"
                        style={{ backgroundColor: '#f4f4f5' }}
                    >
                        <i className="ri-information-line flex-shrink-0" style={{ color: '#8B5CF6' }} />
                        <span>Returns are subject to gold market performance</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn w-100 text-white fw-bold py-3 rounded-pill shadow border-0"
                    style={{ background: 'linear-gradient(to right, #a855f7, #8b5cf6)', fontSize: '15px' }}
                    onClick={() => {
                        commitMonthlyFromInput();
                        // TODO: navigate to Enter Account Details when that screen exists
                        navigate('/plan-selection');
                    }}
                >
                    CONTINUE
                </button>
            </div>
        </div>
    );
};

export default PlanEnrollment;
