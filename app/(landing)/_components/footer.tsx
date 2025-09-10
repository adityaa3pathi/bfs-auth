"use client"
import Link from "next/link"

import { Text } from "../../../components/uiL/text"

export default function Footer() {


  return (
      <div className="flex flex-col items-center justify-center bg-gray-800 py-20 md:py-5">
<div className="container-xs flex flex-col items-center gap-16 px-6 md:px-5 sm:gap-8">
  <div className="flex w- [30%] flex-col items-center gap-8 md:w-full">
    <Text size="textlg" as="p" className="text-[18px] font-normal text-gray-100">
      Saurabh Badaya
    </Text>
    <ul className="flex flex-wrap justify-center gap-5 self-stretch">
      <li>
        <Link href="About" target="_blank" rel="noreferrer">
          <Text size="textlg" as="p" className="text-[18px] font-normal text-gray-100">
            About
          </Text>
        </Link>
      </li>
      <li>
        <Link href="Courses" target="_blank" rel="noreferrer">
          <Text size="textlg" as="p" className="text-[18px] font-normal text-gray-100">
            Courses
          </Text>
        </Link>
      </li>
      <li>
        <Link href="LinkedIn" target="_blank" rel="noreferrer">
          <Text size="textlg" as="p" className="text-[18px] font-normal text-gray-100">
            LinkedIn
          </Text>
        </Link>
      </li>
      <li>
        <Link href="Contact" target="_blank" rel="noreferrer">
          <Text size="textlg" as="p" className="text-[18px] font-normal text-gray-100">
            Contact
          </Text>
        </Link>
      </li>
    </ul>
  </div>
  <div className="flex flex-col gap-5 self-stretch">
<div className="h-px bg-gray-100" />
<div className="flex justify-center gap-9 w-100">
  <Text as="p" className="text-[14px] font-normal text-gray-100">
    © 2024 BadayaFitness&Sports.    All rights reserved.
  </Text>
  <Text as="p" className="text-[14px] font-normal text-gray-100">
    |
  </Text>
  <ul className="flex flex-wrap justify-center gap-6">
    <li>
      <Link href="/privacy-policy">
        <Text as="p" className="text-[14px] font-normal text-gray-100">
           Privacy Policy
        </Text>
      </Link>
    </li>
    <li>
      <Link href="/tnc">
        <Text as="p" className="text-[14px] font-normal text-gray-100">
          Terms & Conditions
        </Text>
      </Link>
    </li>
    <li>
      <Link href="/refund">
        <Text as="p" className="text-[14px]) font-normal text-gray-100">
          Refunds & Cancellation Policy
        </Text>
      </Link>
    </li>
  </ul>
</div>
</div>

</div>
</div>


  )
}