import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@renderer/components/ui/button'
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
import { Textarea } from '@renderer/components/ui/textarea'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  hotenbo: z.string().optional(),
  namsinhbo: z.string().optional(),
  sdtbo: z.string().optional(),
  nghenghiepbo: z.string().optional(),
  nammatbo: z.string().optional(),
  quequanbo: z.string().optional(),
  truquanbo: z.string().optional(),
  hotenme: z.string().optional(),
  namsinhme: z.string().optional(),
  sdtme: z.string().optional(),
  nghenghiepme: z.string().optional(),
  nammatme: z.string().optional(),
  quequanme: z.string().optional(),
  truquanme: z.string().optional(),
  con: z.string().optional(),
  anhchiem: z.string().optional(),
  bomelyhon: z.string().optional(),
  vochong: z.string().optional()
})

const placeholder = 'Nhập thông tin'

interface Props {
  onReturn: () => void
  userId?: string
}

export default function FamilyForm({ onReturn, userId }: Props) {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!userId) {
        throw new Error('Chưa cung cấp user id!')
      }
      await window.api.updateUser(userId, values)
      toast.success('Lưu thành công!')
      navigate({ to: '/users' })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        console.error('Form submission error', error)
        toast.error('Failed to submit the form. Please try again.')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
        {/* dad */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="hotenbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên bố</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="namsinhbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="sdtbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SĐT</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="nghenghiepbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nghề nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={form.control}
              name="nammatbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm mất?</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="quequanbo"
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
          name="truquanbo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trú quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* mom */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="hotenme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên mẹ</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="namsinhme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="sdtme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SĐT</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="nghenghiepme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nghề nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={form.control}
              name="nammatme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm mất?</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="quequanme"
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
          name="truquanme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trú quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* siblings */}
        <FormField
          control={form.control}
          name="anhchiem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin anh chị em trong gia đình</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Họ tên, năm sinh, nghề nghiệp"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Ví dụ: Anh trai Nguyễn Văn A, 1996, Công nhân</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vochong"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin Vợ/chồng</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Họ tên, năm sinh, nghề nghiệp"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Ví dụ: Vợ Nguyễn Thị A, 1996, Công nhân</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* child */}
        <FormField
          control={form.control}
          name="con"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin con</FormLabel>
              <FormControl>
                <Textarea placeholder="Họ tên, năm sinh" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Ví dụ: Con trai Nguyễn Văn A, 2020</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bomelyhon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bố mẹ ly hôn?</FormLabel>
              <FormControl>
                <Textarea placeholder="Họ tên, năm sinh" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Ly hôn năm? nhà có mất anh chị em? Bản thân đang ở với ai? Anh chị em đang ở với ai?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={onReturn} variant="outline">
            Quay lại
          </Button>
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Form>
  )
}
