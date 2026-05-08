'use client'

import { createDropClaimVouchAction, createVouchAction } from '@/actions/vouch'
import { parseApiError } from '@/lib/api-error'
import { toast } from '@/lib/toast'
import CentralIcon from '@central-icons-react/all'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { FunctionComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Drawer } from 'vaul'
import { ORDERS_QUERY_KEYS } from '@/hooks/use-orders'
import { DROPS_QUERY_KEYS } from '@/hooks/use-drops'

type VouchTarget =
  | { type: 'order-item'; orderItemId: string; orderId?: string }
  | { type: 'drop-claim'; dropClaimId: string }

type Props = {
  target: VouchTarget
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'image/webp': [],
}

export const VouchUploadModal: FunctionComponent<Props> = ({ target, open, onOpenChange }) => {
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error('File too large. Maximum size is 10MB.')
      return
    }

    setFile(selectedFile)
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    maxFiles: 1,
  })

  const handleClose = useCallback(() => {
    onOpenChange(false)
    // Small delay to prevent flicker during transition
    setTimeout(() => {
      setFile(null)
      if (preview) URL.revokeObjectURL(preview)
      setPreview(null)
      setSubmitting(false)
    }, 300)
  }, [onOpenChange, preview])

  const handleSubmit = async () => {
    if (!file) return

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (target.type === 'order-item') {
        formData.append('orderItemId', target.orderItemId)
        await createVouchAction(formData)
      } else {
        formData.append('dropClaimId', target.dropClaimId)
        await createDropClaimVouchAction(formData)
      }
      toast.success('Vouch uploaded successfully!')

      if (target.type === 'order-item') {
        if (target.orderId) {
          await queryClient.invalidateQueries({
            queryKey: ORDERS_QUERY_KEYS.detail(target.orderId),
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: DROPS_QUERY_KEYS.myDetail(target.dropClaimId),
        })
        await queryClient.invalidateQueries({ queryKey: DROPS_QUERY_KEYS.myList() })
      }
      await queryClient.invalidateQueries({ queryKey: ['vouches'] })

      handleClose()
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error(parseApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/55" />
        <Drawer.Content
          aria-describedby={undefined}
          className="border-whitesmoke-300/20 fixed top-0 right-0 z-51 flex h-dvh w-[min(100vw,440px)] flex-col border-l border-solid bg-gray-400 shadow-[-8px_0_40px_rgba(0,0,0,0.35)] outline-none"
        >
          <Drawer.Title className="sr-only">Upload Vouch</Drawer.Title>

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="font-nata-sans text-lg font-extrabold text-white uppercase">
                Add a Vouch
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CentralIcon
                name="IconCrossSmall"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={24}
                ariaHidden={true}
                color="#ffffff"
              />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-lightsteelblue-100 text-sm font-semibold">Proof Image</label>
                {!preview ? (
                  <div
                    {...getRootProps()}
                    className={`flex aspect-video cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors ${
                      isDragActive
                        ? 'border-fuchsia bg-fuchsia/5'
                        : 'border-white/10 bg-gray-200 hover:border-white/20'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="rounded-full bg-white/5 p-3 text-white/50">
                      <CentralIcon
                        name="IconCloudCheck"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={32}
                        ariaHidden={true}
                        color="#ffffff"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">
                        {isDragActive ? 'Drop it here' : 'Click or drag image to upload'}
                      </p>
                      <p className="text-xs text-white/40">JPG, PNG or WEBP (max 10MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                    <Image src={preview} alt="Preview" fill className="object-contain" />
                    <button
                      onClick={() => {
                        setFile(null)
                        setPreview(null)
                      }}
                      className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <CentralIcon
                        name="IconTrashCan"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={18}
                        ariaHidden={true}
                        color="#ff2a2a"
                      />
                    </button>
                  </div>
                )}
                <p className="text-[11px] leading-relaxed text-white/40">
                  <span className="font-semibold text-white/60">Note:</span> We add a Jinx watermark
                  before publishing — please ensure no personal info is visible in the screenshot.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-6">
            <button
              disabled={!file || submitting}
              onClick={handleSubmit}
              className="bg-fuchsia font-nata-sans flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-white uppercase shadow-[0_2px_0_rgba(235,45,255,0.5)] transition-all active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Uploading...
                </>
              ) : (
                'Publish Vouch'
              )}
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
