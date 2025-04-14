import React, { memo, useState } from 'react';
import { Button } from 'app/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
interface Props {}

export const ContactNavigationTabs = memo((props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleTabChange = link => {
    navigate('/admin/contacts/' + link);
  };

  return (
    <React.Fragment>
      {/* <div className="flex justify-center mt-10">
        <Button
          onClick={() => handleTabChange('leads')}
          variant={
            location.pathname.includes('leads') ? 'blueBtn' : 'leadBtnTab'
          }
          type="button"
          className={`py-2 px-10 ml-4 font-normal text-14 rounded-full ${
            location.pathname.includes('leads')
              ? 'text-white'
              : 'text-black bg-transparent'
          }`}
        >
          Leads{' '}
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M11.8746 1.6665H7.07829C6.92873 1.6665 6.85394 1.6665 6.78792 1.68928C6.72954 1.70942 6.67636 1.74228 6.63224 1.7855C6.58234 1.83436 6.5489 1.90125 6.48201 2.03503L2.98201 9.03503C2.82228 9.35449 2.74241 9.51423 2.76159 9.64407C2.77834 9.75745 2.84106 9.85892 2.93498 9.92461C3.04253 9.99984 3.22112 9.99984 3.57829 9.99984H8.7496L6.2496 18.3332L16.4105 7.79593C16.7533 7.44042 16.9247 7.26267 16.9348 7.11057C16.9435 6.97855 16.8889 6.85024 16.7879 6.76486C16.6714 6.6665 16.4245 6.6665 15.9306 6.6665H9.9996L11.8746 1.6665Z"
                stroke={location.pathname.includes('leads') ? 'white' : 'black'}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </Button>
        <Button
          onClick={() => handleTabChange('agents')}
          variant={
            location.pathname.includes('agents') ? 'blueBtn' : 'leadBtnTab'
          }
          type="button"
          className={`py-2 px-10 ml-4 font-normal text-14 rounded-full ${
            location.pathname.includes('agents')
              ? 'text-white'
              : 'text-black bg-transparent'
          }`}
        >
          Agents
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M18.3332 17.5V15.8333C18.3332 14.2801 17.2709 12.9751 15.8332 12.605M12.9165 2.7423C14.1381 3.23679 14.9998 4.43443 14.9998 5.83333C14.9998 7.23224 14.1381 8.42988 12.9165 8.92437M14.1665 17.5C14.1665 15.9469 14.1665 15.1703 13.9128 14.5577C13.5745 13.741 12.9255 13.092 12.1088 12.7537C11.4962 12.5 10.7196 12.5 9.1665 12.5H6.6665C5.11337 12.5 4.3368 12.5 3.72423 12.7537C2.90747 13.092 2.25855 13.741 1.92024 14.5577C1.6665 15.1703 1.6665 15.9469 1.6665 17.5M11.2498 5.83333C11.2498 7.67428 9.75745 9.16667 7.9165 9.16667C6.07555 9.16667 4.58317 7.67428 4.58317 5.83333C4.58317 3.99238 6.07555 2.5 7.9165 2.5C9.75745 2.5 11.2498 3.99238 11.2498 5.83333Z"
                stroke={
                  location.pathname.includes('agents') ? 'white' : 'black'
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </Button>
        <Button
          onClick={() => handleTabChange('builders')}
          variant={
            location.pathname.includes('builders') ? 'blueBtn' : 'leadBtnTab'
          }
          type="button"
          className={`py-2 px-10 ml-4 font-normal text-14 rounded-full ${
            location.pathname.includes('builders')
              ? 'text-white'
              : 'text-black bg-transparent'
          }`}
        >
          Builders
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.5 15.625H16.875V3.125C16.875 2.95924 16.8092 2.80027 16.6919 2.68306C16.5747 2.56585 16.4158 2.5 16.25 2.5H11.875C11.7092 2.5 11.5503 2.56585 11.4331 2.68306C11.3158 2.80027 11.25 2.95924 11.25 3.125V6.25H7.5C7.33424 6.25 7.17527 6.31585 7.05806 6.43306C6.94085 6.55027 6.875 6.70924 6.875 6.875V10H3.75C3.58424 10 3.42527 10.0658 3.30806 10.1831C3.19085 10.3003 3.125 10.4592 3.125 10.625V15.625H2.5C2.33424 15.625 2.17527 15.6908 2.05806 15.8081C1.94085 15.9253 1.875 16.0842 1.875 16.25C1.875 16.4158 1.94085 16.5747 2.05806 16.6919C2.17527 16.8092 2.33424 16.875 2.5 16.875H17.5C17.6658 16.875 17.8247 16.8092 17.9419 16.6919C18.0592 16.5747 18.125 16.4158 18.125 16.25C18.125 16.0842 18.0592 15.9253 17.9419 15.8081C17.8247 15.6908 17.6658 15.625 17.5 15.625ZM12.5 3.75H15.625V15.625H12.5V3.75ZM8.125 7.5H11.25V15.625H8.125V7.5ZM4.375 11.25H6.875V15.625H4.375V11.25Z"
                fill={
                  location.pathname.includes('builders') ? 'white' : 'black'
                }
              />
            </svg>
          </span>
        </Button>
        <Button
          onClick={() => handleTabChange('recruits')}
          variant={
            location.pathname.includes('recruits') ? 'blueBtn' : 'leadBtnTab'
          }
          type="button"
          className={`py-2 px-10 ml-4 font-normal text-14 rounded-full ${
            location.pathname.includes('recruits')
              ? 'text-white'
              : 'text-black bg-transparent'
          }`}
        >
          Recruits
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.7335 1.87973C10.5608 1.86467 10.3869 1.88568 10.2228 1.94143C10.0587 1.99717 9.90801 2.08643 9.78025 2.20354C9.65249 2.32064 9.55048 2.46304 9.4807 2.62167C9.41091 2.78031 9.37488 2.95173 9.37489 3.12504V6.30238C9.37273 6.59721 9.47577 6.88315 9.6655 7.10882C9.85524 7.3345 10.1192 7.48512 10.41 7.53363C10.8747 7.61159 11.3079 7.81926 11.6596 8.13272C12.0114 8.44617 12.2674 8.85264 12.3982 9.30529C12.5289 9.75793 12.5291 10.2383 12.3987 10.6911C12.2684 11.1438 12.0127 11.5505 11.6612 11.8642C11.3097 12.178 10.8767 12.386 10.4121 12.4644C9.94751 12.5427 9.47023 12.4882 9.03529 12.307C8.60035 12.1259 8.22544 11.8256 7.95378 11.4406C7.68213 11.0557 7.52478 10.6018 7.49989 10.1313C7.46785 9.4891 7.5991 8.95941 7.89051 8.54848C8.06178 8.30957 8.14253 8.01756 8.11834 7.72461C8.09416 7.43165 7.96661 7.15684 7.75848 6.94926L5.60067 4.74066C5.47767 4.61766 5.33036 4.52168 5.16814 4.45887C5.00593 4.39606 4.8324 4.36779 4.65864 4.37588C4.48488 4.38397 4.31472 4.42823 4.15905 4.50585C4.00337 4.58346 3.86561 4.6927 3.75457 4.8266C2.45221 6.38753 1.78493 8.38139 1.88538 10.4118C1.98584 12.4422 2.84668 14.3604 4.29676 15.7852C5.81301 17.2895 7.86402 18.131 9.99989 18.125H10.1163C12.2292 18.0891 14.2455 17.2337 15.7397 15.7393C17.2339 14.245 18.0891 12.2286 18.1249 10.1157C18.1835 5.87348 14.9366 2.25629 10.7335 1.87973ZM4.71239 5.62035L6.86942 7.82269V7.82738C6.54923 8.28686 6.34817 8.81866 6.28426 9.37504H3.15301C3.27818 7.99385 3.82224 6.68384 4.71239 5.62035ZM3.15379 10.625H6.30223C6.43184 11.393 6.79733 12.1015 7.34794 12.6522C7.89856 13.203 8.60699 13.5687 9.37489 13.6985V16.8469C7.77414 16.7007 6.27524 15.9982 5.1387 14.8615C4.00215 13.7248 3.29983 12.2258 3.15379 10.625ZM14.8546 14.8547C13.7225 15.9947 12.2249 16.6992 10.6249 16.8446V13.6985C11.3492 13.5779 12.0215 13.2454 12.5569 12.743C13.0688 12.2661 13.4371 11.6555 13.6201 10.9803C13.8031 10.305 13.7936 9.59204 13.5926 8.92193C13.3916 8.25181 13.0071 7.65128 12.4827 7.18823C11.9583 6.72517 11.3147 6.41806 10.6249 6.3016V3.12504C14.1811 3.44379 16.9272 6.50629 16.8749 10.0977C16.8503 11.8867 16.1249 13.5948 14.8546 14.8547Z"
                fill={
                  location.pathname.includes('recruits') ? 'white' : 'black'
                }
              />
            </svg>
          </span>
        </Button>
      </div> */}
    </React.Fragment>
  );
});
