import Image from "next/image";
import DropDownMenu from "../common/dropdown-menu";
import MenuIcon from "@/../public/icons/menu.svg";
import DeleteModal from "../common/modal-delete";
import { useState } from "react";

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
}

export default function MyWineCard({ wine }: { wine: Wine }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seletedWineId, setSeletedWineId] = useState<number | null>(null);

  function openDeleteModal() {
    setSeletedWineId(wine.id);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setSeletedWineId(null);
    setIsDeleteModalOpen(false);
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("ko-KR").format(price);
  }

  return (
    <div className="desktop:w-[80rem] tablet:w-full mobile:w-full min-h-[27rem] flex">
      <div className="mt-[4rem]">
        <div className="relative desktop:w-[80rem] desktop:h-[22.8rem] tablet:w-full] talbet:h-[22.8rem] mobile:w-full mobile:h-[22.8rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 flex desktop:pl-[6rem] tablet:pl-[6rem] mobile:pl-[2rem]">
          <div className="relative desktop:w-[7.6rem] desktop:h-[27rem] tablet:w-[7.6rem] tablet:h-[27rem] mobile:w-[5.3rem] mobile:h-[18.5rem] overflow-hidden self-end">
            <Image
              src={wine.image}
              alt="와인사진"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              className="absolute"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="m-[3rem_0_3rem_4rem]">
              <div className="mb-[2rem]">
                <p className="break-words w-full text-[3rem] font-semibold leading-[3.58rem] text-gray-800 mb-[2rem]">
                  {wine.name}
                </p>
                <p className="text-[1.6rem] font-regular leading-[2.6rem] text-gray-500">
                  {wine.region}
                </p>
              </div>
              <p
                className="
              desktop:min-w-[11.4rem] desktop:h-[3.7rem] desktop:p-[0.55rem_1.5rem] desktop:text-[1.8rem] desktop:leading-[2.6rem]
              tablet:min-w-[11.4rem] tablet:h-[3.7rem] tablet:p-[0.55rem_1.5rem] tablet:text-[1.8rem] tablet:leading-[2.6rem]
              mobile:min-w-[11.4rem] mobile:h-[3.7rem] mobile:p-[0.55rem_1.5rem] mobile:text-[1.8rem] mobile:leading-[2.6rem]
              bg-[#F1EDFC] rounded-[1.2rem] gap-[1rem] text-primary font-bold  inline-block"
              >
                ₩ {formatPrice(wine.price)}
              </p>
            </div>
            <div className="m-[3rem_4rem]">
              <DropDownMenu onDelete={openDeleteModal}>
                <Image
                  src={MenuIcon}
                  alt="메뉴 아이콘"
                  className="desktop:w-[2.6rem] tablet:w-[2.6rem] mobile:w-[2.4rem] desktop:h-[2.6rem] tablet:h-[2.6rem] mobile:h-[2.4rem]"
                />
              </DropDownMenu>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        id={seletedWineId!}
        type="wine"
      />
    </div>
  );
}
