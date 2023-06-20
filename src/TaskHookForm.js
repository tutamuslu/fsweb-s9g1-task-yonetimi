import { nanoid } from 'nanoid';
import React from 'react'
import { useForm } from 'react-hook-form'

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;
  const { register,
    handleSubmit,
    formState: { errors, isValid } } = useForm({
      mode: "onChange",
      defaultValues: {
        title: "",
        description: "",
        people: []
      }
    })

  const onSubmit = (data,e) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak"
    })
    e.target.reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı"
            }
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task başlığı en az 10 karakter olmalı"
            }
          })}

        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: value => {
                    if (value.lentgh < 1 || value.length > 3) {
                      return "Lütfen en az 1 en fazla 3 kişi seçiniz"
                    }
                  }
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  )
}
