import { SideBar, RecordCard } from "@/app/components";
import { ArrowLeft, ArrowRight } from "@/icons";

const Record = () => {
  return (
    <div className="max-w-[1200px] mx-auto py-8 flex gap-8">
      <SideBar />
      <section>
        <div className="flex flex-row justify-between">
          <div className="mb-6">
            {/* hajuu tiisjee guilgeh heseg */}
            <div className="flex items-center gap-3">
              <button className="btn btn-square bg-[#E5E7EB]">
                <ArrowRight />
              </button>
              <p>Last 30 Days</p>
              <button className="btn btn-square bg-[#E5E7EB]">
                <ArrowLeft />
              </button>
            </div>
          </div>

          {/* dropdown heseg */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Newest fisrt
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Aqua"
                  value="aqua"
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="mb-3">Today</h2>
          <div className="flex flex-col gap-4">
            <RecordCard
              recordName="Lending & Renting"
              recordDate="14:00"
              recordAmount={-100}
            />
            <RecordCard
              recordName="Food & Drinks"
              recordDate="14:00"
              recordAmount={100}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Record;
