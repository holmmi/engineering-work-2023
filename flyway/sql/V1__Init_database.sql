CREATE TABLE public.user_account (
    id VARCHAR(40) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    nick_name VARCHAR(24),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX nick_name_idx ON public.user_account (nick_name);

CREATE TABLE public.unit_conversion_exercise (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(40) REFERENCES public.user_account(id),
    unit_name VARCHAR(10) NOT NULL,
    from_unit VARCHAR(8) NOT NULL,
    to_unit VARCHAR(8) NOT NULL,
    value_to_convert double precision NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.unit_conversion_exercise_answer (
    id SERIAL PRIMARY KEY,
    exercise_id INTEGER REFERENCES public.unit_conversion_exercise(id),
    user_id VARCHAR(40) REFERENCES public.user_account(id),
    converted_value DOUBLE PRECISION NOT NULL,
    is_correct BOOLEAN NOT NULL,
    answered_at TIMESTAMP NOT NULL DEFAULT NOW()
);