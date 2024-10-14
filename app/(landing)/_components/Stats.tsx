"use client"
import "./styles.css"

export default function stats() {
    return (
<div id="stats" className="bg-gray-900 py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base leading-7 text-gray-400">State Players</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
          <span className="animate-[counter_3s_ease-out_forwards] tabular-nums [counter-set:_num_var(--num-transactions)] before:content-[counter(num)]"> <span className="sr-only">1200</span>+ </span>
        </dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base leading-7 text-gray-400"> Active Students</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
          <span className="animate-[counter_3s_ease-out_forwards] tabular-nums [counter-set:_num_var(--num-assets)] before:content-[counter(num)]"> <span className="sr-only">500</span> + </span>
        </dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base leading-7 text-gray-400">Total Students</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
          <span className="animate-[counter_3s_ease-out_forwards] tabular-nums [counter-set:_num_var(--num-users)] before:content-[counter(num)] before:left-[calc(0.4em * var(--n, 1))]">
            <span className="sr-only">4600</span>+
          </span>
        </dd>
      </div>
    </dl>
  </div>
</div>
    )
}