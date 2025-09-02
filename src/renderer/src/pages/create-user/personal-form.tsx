import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@renderer/components/ui/input-otp'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Textarea } from '@renderer/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const error = 'Chưa đủ thông tin',
  placeholder = 'Nhập thông tin'

const formSchema = z.object({
  hoten: z.string({
    error
  }),
  ngaysinh: z.string({ error }),
  nhapngu: z.string({ error }).min(6, { error }),
  capbac: z.string({ error }),
  chucvu: z.string({ error }),
  vanhoa: z.string().min(2, { error }),
  vaodoan: z.string({ error }).optional(),
  vaodang: z.string({ error }).optional(),
  dantoc: z.string({ error }),
  tongiao: z.string({ error }),
  khokhan: z.string().optional(),
  doandang: z.string().optional(),
  sohieuqn: z.string({ error }).optional(),
  capbacheso: z.string({ error }).optional(),
  thanhphan: z.string({ error }),
  thuongtru: z.string({ error }),
  sothedang: z.string().optional(),
  truocnhapngu: z.string({ error }).optional(),
  truongquandoi: z.string({ error }).optional(),
  nuocngoai: z.string({ error }).optional(),
  sotruong: z.string({ error }).optional(),
  laodongchinh: z.boolean().default(false).optional(),
  nguoithandinuocngoai: z.string().optional(),
  bomebichatdocdacam: z.string().optional(),
  conguoitrongquandoi: z.string().optional(),
  phatgiamcaitao: z.string().optional(),
  tomtatcongtac: z.string().optional(),
  bienche: z.string().optional(),
  trinhdo: z.string().optional(),
  tentruong: z.string().optional(),
  quequan: z.string({ error })
})

interface Props {
  onFinish: (data: any) => void
  defaultData: any
}

export default function PersonalForm({ onFinish, defaultData }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vanhoa: '12/12',
      tongiao: 'Không',
      doandang: 'doanvien',
      dantoc: 'Kinh',
      thanhphan: 'Bần nông',
      nuocngoai: 'Không',
      nguoithandinuocngoai: 'Không',
      bomebichatdocdacam: 'Không',
      conguoitrongquandoi: 'Không',
      phatgiamcaitao: 'Không'
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (defaultData && defaultData.id) {
        onFinish((prev: any) => ({ ...prev, ...values }))
      } else {
        const res = await window.api.createUser(values)
        onFinish((prev: any) => ({ ...prev, ...values, id: res.id }))
      }
      toast.success('Lưu thành công')
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  const doanvien = form.watch('doandang') === 'doanvien'

  useEffect(() => {
    if (defaultData && Object.keys(defaultData).length > 0) {
      form.reset(defaultData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (inValid) => {
          console.error(inValid)
        })}
        className="mx-auto w-full max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="hoten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ngaysinh"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nhập thông tin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="sohieuqn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số hiệu quân nhân</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capbacheso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấp bậc, hệ số</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormDescription>Tháng năm nhận</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="dantoc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dân tộc</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type="text"
                    list="dantoc"
                    id="dantoc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tongiao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tôn giáo</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="nhapngu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập ngũ</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Tháng / năm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 items-start gap-3">
          <FormField
            control={form.control}
            name="capbac"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cấp bậc</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Cấp bậc" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                    <SelectItem value="H1">H1</SelectItem>
                    <SelectItem value="H2">H2</SelectItem>
                    <SelectItem value="H3">H3</SelectItem>
                    <SelectItem value="1/">1/</SelectItem>
                    <SelectItem value="2/">2/</SelectItem>
                    <SelectItem value="3/">3/</SelectItem>
                    <SelectItem value="4/">4/</SelectItem>
                    <SelectItem value="1//">1//</SelectItem>
                    <SelectItem value="2//">2//</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chucvu"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Chức vụ</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} list="chucvus" />
                </FormControl>
                <datalist id="chucvus">
                  <option value="ct" />
                  <option value="ctv" />
                  <option value="cp" />
                  <option value="ctvp" />
                  <option value="bt" />
                  <option value="cs" />
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bienche"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biên chế</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Tiểu đội, Trung đội, Đại đội. Ví dụ: a5, b2, c4</FormDescription>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="vanhoa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Văn hóa</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thanhphan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thành phần gia đình</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="trinhdo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trình độ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Trung cấp', 'Cao Đẳng', 'Đại học'].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-8">
            <FormField
              control={form.control}
              name="tentruong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên trường</FormLabel>
                  <FormControl>
                    <Input placeholder="Ví dụ: Đại học FPT" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12">
            <FormDescription>Trung cấp, Cao Đẳng, Đại học</FormDescription>
          </div>
        </div>

        <FormField
          control={form.control}
          name="quequan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quê quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Xóm, xã, tỉnh</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thuongtru"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nơi ở hiện nay</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Xóm, xã, tỉnh</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doandang"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Đoàn đảng</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  value={field.value}
                >
                  {[
                    ['Đoàn viên', 'doanvien'],
                    ['Đảng viên', 'dangvien']
                  ].map((option) => (
                    <FormItem className="flex items-center space-y-0 space-x-3" key={option[1]}>
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vaodoan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày vào đoàn</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập thông tin"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!doanvien && (
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="vaodang"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày vào Đảng</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nhập thông tin"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={doanvien}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sothedang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số thẻ đảng</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="truocnhapngu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trước khi nhập ngũ làm gì, ở đâu</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="truongquandoi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Học qua trường nào trong Quân đội</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Thời gian học</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nuocngoai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đã từng đi nước ngoài</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Thời gian đi</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sotruong"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sở trường</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="laodongchinh"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Là lao động chính?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nguoithandinuocngoai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Có người thân đi nước ngoài không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bomebichatdocdacam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bố mẹ bị chất độc da cam không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conguoitrongquandoi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gia đình có người trong quân đội không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Cấp bậc, chức vụ, đơn vị</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phatgiamcaitao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gia đình có ai bị phạt giam cải tạo không</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tomtatcongtac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tóm tắt quá trình công tác trong quân đội</FormLabel>
              <FormControl>
                <Textarea placeholder={placeholder} className="resize-none" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="khokhan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hoàn cảnh khó khăn?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả hoàn cảnh khó khăn"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Form>
  )
}
