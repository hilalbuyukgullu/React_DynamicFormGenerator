import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { formService } from "./config/Service";
import { Forms, IndigoChild } from "./Models/IForm";

function App() {
  const [formData, setFormData] = useState<Forms>()
  const [tagInfo, setTagInfo] = useState<any[]>([])
  const [formName, setFormName] = useState("")
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    formService().then(res => {
      const data: Forms = res.data;
      setFormData(data)
      formTag(formData!)
    })
  }, [formData])


  function formTag(formData: Forms) {
    const tagArr: IndigoChild[] = [];
    const formTitle = formData?.forms[0].bilgiler.formname;
    setFormName(formTitle)
    formData?.forms[0].bilgiler.formjson.children[0].children[0].children[0].children.map((item, index) => {
      item.children?.map((item, index) => {
        if (item.tag === "label" && item.class === "control-label") {
          tagArr.push(item)
        }
        item.children?.map((item, index) => {
          tagArr.push(item)
        })
      })
    })
    setTagInfo(tagArr)
  }

  function fncFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(`list`, list)
    list.splice(0)
    setList(list)
    console.log(`obj`, obj)
  }
  //onChange: (e: React.FocusEvent<HTMLInputElement>) => { list.push(e.target.value); setList(list)  },
  const [obj, setObj] = useState<any>([])

  function fncOnChange(name: any, e: any) {
    if (name !== "button" && name!=="singlebutton-0") {
      obj.push({[name]: e})
    }
  }

  const getForm = () => (
    
    <form onSubmit={(e) => fncFormSubmit(e)}>
      {tagInfo?.map((item, index) => {
              if (item.children === undefined) {
                return (
                  <div key={index}>
                    {React.createElement(
                      item.tag, {
                      className: item.tag === "input" ? "form-control" : item.tag === "label" ? "form-label" : item.tag === "textarea" ? "form-control" : item.class,
                      id: item.id,
                      name: item.name,
                      type: item.type,
                      placeholder: item.placeholder,
                      onBlur: (e) => { fncOnChange(item.name ,e.target.value)  },
                    }, item.html,
                    )}
                  </div>
                )
              } else if (item.tag === "label" && item.class === "radio") {
                return (
                  <Fragment key={index}>
                    {React.createElement(
                      item.tag, {
                      className: item.class,
                      id: item.id,
                      name: item.name,
                      type: item.type,
                      placeholder: item.placeholder,
                    }, item.html,
                      item.children.map((item: any, index: number) => {
                        return (
                          <Fragment key={index}>
                            {React.createElement(
                              item.tag, {
                              className: "form-check-input",
                              type: item.type,
                              name: item.name,
                              id: item.id,
                              html: item.html,
                              value: item.value,
                              onChange: (e:React.ChangeEvent<HTMLInputElement>) => { fncOnChange(item.name, e.target.defaultValue) },
                            }
                            )}
                          </Fragment>
                        )
                      })
                    )
                    }
                  </Fragment>
                )
              } else if (item.tag === "select") {
                return (
                  <Fragment key={index}>
                    {React.createElement(
                      item.tag, {
                      className: "form-select",
                      id: item.id,
                      name: item.name,
                      type: item.type,
                      placeholder: item.placeholder,
                      html: item.html,
                      onChange: (e:React.ChangeEvent<HTMLInputElement>) => { fncOnChange(item.name, e.target.value)},
                    },
                      item.children.map((item: any, index: number) => {
                        return (
                          <Fragment key={index}>
                            {React.createElement(
                              item.tag, {
                              type: item.type,
                              value: item.html,
                              className: item.class,
                            }, item.html
                            )}
                          </Fragment>
                        )
                      })
                    )}
                  </Fragment>
                )
              } else if (item.class === "input-prepend" || item.class === "input-append") {
                return (
                  <Fragment key={index}>
                    {React.createElement(
                      item.tag, {
                      type: item.type,
                      className: item.class,
                      onBlur: (e) => { fncOnChange(item.class ,e.target.value)  },
                    }, item.html,
                      item.children.map((item: any, index: number) => {
                        if (item.tag === "div") {
                          return (
                            <Fragment key={index}>
                              {React.createElement(
                                item.tag,
                                {
                                  type: item.type,
                                  name: item.name,
                                  html: item.html,
                                  className: item.class,
                                }, item.html,
                                item.children.map((item: any, index: number) => {
                                  if (item.tag === "button") {
                                    return (
                                      <Fragment key={index}>
                                        {React.createElement(
                                          item.tag, {
                                          type: item.type,
                                          name: item.name,
                                          className: item.class,
                                        }, item.html,
                                        )}
                                      </Fragment>
                                    )
                                  }
                                })
                              )}
                            </Fragment>
                          )
                        }
                        else if (item.html === "\r\n      ") {
                          return (
                            <Fragment key={index}>
                              {React.createElement(
                                item.tag,
                                {
                                  type: item.type,
                                  name: item.name,
                                  html: item.html,
                                  className: item.class,
                                }, item.html,
                                item.children.map((item: any, index: number) => {
                                  if (item.children !== undefined) {
                                    return (
                                      <Fragment key={index}>
                                        {React.createElement(
                                          item.tag, {
                                          type: item.type,
                                            className: item.class,
                                            onChange: (e:React.FocusEvent<HTMLInputElement>) => { fncOnChange(item.name, e.target.checked) },
                                        }, item.html,
                                          item.children.map((item: any, index: number) => {
                                            return (
                                              <Fragment key={index}>
                                                {React.createElement(
                                                  item.tag, {
                                                  type: item.type,
                                                  className: item.class
                                                }, item.html,
                                                )}
                                              </Fragment>
                                            )
                                          })
                                        )}
                                      </Fragment>
                                    )
                                  } else {
                                    return (
                                      <Fragment key={index}>
                                        {React.createElement(
                                          item.tag, {
                                          type: item.type,
                                          className: item.class,
                                          onChange: (e:React.FocusEvent<HTMLInputElement>) => {  fncOnChange(item.name, e.target.checked)  }
                                        }, item.html,
                                        )}
                                      </Fragment>
                                    )
                                  }
                                })
                              )}
                            </Fragment>
                          )
                        }
                        else {
                          return (
                            <Fragment key={index}>
                              {React.createElement(
                                item.tag,
                                {
                                  type: item.type,
                                  name: item.name,
                                  html: item.html,
                                  className: item.tag === "input" ? "form-control" : item.class,
                                }, item.html,
                              )}
                            </Fragment>
                          )
                        }
                      }),
                    )}
                  </Fragment>
                )
              } else if (item.class === "checkbox" || item.class === "checkbox inline") {
                return (
                  <Fragment key={index}>
                    {React.createElement(
                      item.tag, {
                      className: "form-check-label",
                      htmlFor: item.for,
                    }, item.html,
                      item.children.map((item: any, index: number) => {
                        return (
                          <Fragment key={index}>
                            {React.createElement(
                              item.tag, {
                              type: item.type,
                              name: item.name,
                              value: item.value,
                                className: "form-check-input",
                                onChange: (e:React.ChangeEvent<HTMLInputElement>) => {  fncOnChange(item.name, e.target.value) }
                            }
                            )}
                          </Fragment>
                        )
                      })
                    )}
                  </Fragment>
                )
              }
            })}
          </form>
  )

  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>{formName}</h1>
          {getForm()}
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}
export default App;
