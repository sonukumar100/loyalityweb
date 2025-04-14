import React, { useRef, useState } from 'react';
import { Input } from 'app/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'app/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'app/components/ui/card';
import { Button } from 'app/components/ui/button';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { selectAdminEdit } from '../../slice/selectors';
import { useLeadSlice } from '../../slice';
import { LeafyGreen } from 'lucide-react';
import { SingleSearchWithAPI } from 'app/components/Shared/single-search-with-api';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { useToast } from 'app/components/ui/use-toast';
import Autocomplete from 'react-google-autocomplete';
import { Textarea } from 'app/components/ui/textarea';
import { Icons } from 'app/components/ui/icons';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'app/components/ui/accordion';
import { format } from 'path';

export function Leadtask({ activeTab }) {
  const { toast } = useToast();
  const {
    useAddTasksMutation,
    useTasksListQuery,
    useDeleteTaskMutation,
    useLeadListQuery,
    useUpdateTaskMutation,
  } = useLeadSlice();
  const form = useForm();
  const [date, setDate] = React.useState(new Date(2024, 1, 1));
  const editSelector = useSelector(selectAdminEdit);
  const [editing, setEditing] = React.useState(false);
  const [showAddTaskButton, setShowAddTaskButton] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<string | null>('item-1');
  const [activeAccordionItem, setActiveAccordionItem] = React.useState(null);
  const [showEditAccordion, setShowEditAccordion] = React.useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
  const [time, setTime] = React.useState('');
  const [timeError, setTimeError] = React.useState('');

  const ref = React.useRef(null);

  const handleAccordionChange = value => {
    setActiveItem(value === activeItem ? null : value);
  };

  const handleAddTask = () => {
    setShowAddTaskForm(true);
    setActiveAccordionItem(null);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' }); // Adjust behavior as needed
    }
  };

  const cancelAddTask = () => {
    setShowAddTaskForm(false);
  };

  const [
    addTask,
    {
      isLoading: addTaskLoading,
      isSuccess: addTaskSuccess,
      error: addTaskError,
    },
  ] = useAddTasksMutation();
  const [
    updateTask,
    {
      isLoading: updateTaskLoading,
      isSuccess: updateTaskSuccess,
      error: updateTaskError,
    },
  ] = useUpdateTaskMutation();
  const [
    tasksList,
    {
      isSuccess: tasksSuccess,
      isLoading: tasksLoading,
      data: tasksData,
      error: tasksError,
    },
  ] = useTasksListQuery();
  const [tasks, setTasks] = React.useState(tasksData?.data?.documents);
  const [
    leadList,
    {
      isLoading: leadListLoading,
      isSuccess: leadListSuccess,
      data: leadListData,
      error: leadListError,
    },
  ] = useLeadListQuery();

  const [
    deleteTask,
    {
      isSuccess: deleteTaskSuccess,
      isLoading: deleteTaskLoading,
      data: deleteTaskData,
      error: deleteTaskError,
    },
  ] = useDeleteTaskMutation();

  const { useAdminUserListQuery } = useAdminSlice();

  const [
    admin,
    {
      isLoading: isTeamList,
      isSuccess: isTeamListData,
      data: loadOfficerData,
      error: isTeamListDataError,
    },
  ] = useAdminUserListQuery();

  const tasksPayload = {
    contactId: editSelector?._id,
    page: 1,
    pageSize: 5,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputFocus = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const padToTwoDigits = num => String(num).padStart(2, '0');

  const handleCreateTaskSubmit = data => {
    console.log('Date value:', date);
    const formattedDate = date.toString().includes('-')
      ? date
      : `${date?.getFullYear()}-${padToTwoDigits(
        date?.getMonth() + 1,
      )}-${padToTwoDigits(date?.getDate())}`;

    if (!time) {
      toast({
        description: 'Time is required',
        variant: 'destructive',
      });
      return;
    }

    if (editSelector) {
      const body = {
        taskId: activeAccordionItem?._id,
        contactId: editSelector._id,
        type: 'Lead',
        contactEmail: editSelector.email,
        name: data.taskName,
        description: data.description,
        date: formattedDate,
        time: time,
        duration: Number(data.duration),
        location: data.location,
        guest: [],
        status: 2,
        meetingRoom: '',
      };
      if (body?.taskId) {
        updateTask(body).unwrap();
        setShowEditAccordion(false);
      } else {
        addTask(body).unwrap();
      }
    }
  };

  React.useEffect(() => {
    if (activeAccordionItem) {
      form.setValue('taskName', activeAccordionItem?.name);
      form.setValue('description', activeAccordionItem?.description);
      setDate(activeAccordionItem?.date);
      setTime(activeAccordionItem?.time);
      form.setValue('time', activeAccordionItem?.time);
      form.setValue('duration', activeAccordionItem?.duration);
    } else {
      form.setValue('taskName', '');
      form.setValue('description', '');
      setDate(new Date());
      form.setValue('time', '');
      form.setValue('duration', '');
      setTime('');
    }
  }, [activeAccordionItem]);

  const handleDateChange = date => {
    setDate(date);
    form.setValue('due_date', date);
  };

  React.useEffect(() => {
    if (showAddTaskForm) {
      form.setValue('taskName', '');
      form.setValue('description', '');
      form.setValue('time', '');
      form.setValue('duration', '');
      setDate(new Date());
      setTime('');
    }
  }, [showAddTaskForm]);

  React.useEffect(() => {
    if (addTaskSuccess) {
      toast({
        description: 'Task added successfully',
      });
      tasksList(tasksPayload);
      setTasks(tasksData?.data?.documents);
      setShowAddTaskForm(false);
      setActiveItem('');
      form.reset();
    }
  }, [addTaskSuccess, toast]);

  React.useEffect(() => {
    if (updateTaskSuccess) {
      toast({
        description: 'Task updated successfully',
      });
      tasksList(tasksPayload);
      setTasks(tasksData?.data?.documents);
      setActiveAccordionItem(null);
      setActiveItem('');
      form.reset();
    }
  }, [updateTaskSuccess, toast]);

  React.useEffect(() => {
    if (editSelector) {
      const payload = {
        contactId: editSelector._id,
        page: 1,
        pageSize: 5,
      };
      tasksList(payload);
      setTasks(tasksData?.data?.documents);
    }
  }, [editSelector, setTasks, addTaskSuccess, updateTaskSuccess]);

  React.useEffect(() => {
    if (tasksData) {
      console.log('tasksData', tasksData);
      setTasks(tasksData?.data?.documents);
    }
  }, [tasksData, addTaskSuccess, updateTaskSuccess, deleteTaskSuccess]);

  const deleteTaskByID = taskId => {
    deleteTask(taskId);
  };

  React.useEffect(() => {
    if (deleteTaskSuccess) {
      toast({
        description: 'Task Deleted Successfully',
      });
      tasksList(tasksPayload);
      setTasks(tasksData?.data?.documents);
      setActiveItem('');
    }
  }, [toast, deleteTaskSuccess]);

  const isValidTime = time => {
    if (typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
      return false;
    }
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  };

  const handleTimeChange = newTime => {
    if (isValidTime(newTime)) {
      setTime(newTime);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid time');
      return;
    }
  };

  return (
    <>
      <TabsContent value="Tasks">
        <div className=" rounded-24 bg-white py-10 px-10">
          <div id="scrollTarget" ref={ref}>
            {showAddTaskForm && (
              <Accordion
                type="single"
                collapsible
                className="w-full py-1"
                value={showAddTaskForm ? 'item-1' : activeItem?.toString()}
                onValueChange={handleAccordionChange}
              >
                <div className="border px-6 mt-6 rounded-[1.2rem]">
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                    >
                      <div className="w-full text-start">
                        <h4 className="leading-none text-md mb-5 text-gray-600 font-semibold">
                          Create Task
                        </h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-10">
                        <form
                          onSubmit={form.handleSubmit(handleCreateTaskSubmit)}
                          className="p-2"
                        >
                          <div className="mb-4">
                            <label
                              htmlFor="taskName"
                              className="text-[14px] font-semibold"
                            >
                              Task Name
                            </label>
                            <Input
                              type="text"
                              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                              id="taskName"
                              value={form.watch('taskName')}
                              {...form.register('taskName', {
                                required: true,
                              })}
                              placeholder="Enter Task Name"
                            />
                            {!activeAccordionItem &&
                              form.formState?.errors.taskName?.type ===
                              'required' && (
                                <div className="text-red-500 mt-1 text-[10px]">
                                  Task Name is required
                                </div>
                              )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="description"
                              className="text-[14px] font-semibold"
                            >
                              Description
                            </label>
                            <Textarea
                              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                              id="description"
                              value={form.watch('description')}
                              {...form.register('description', {
                                required: false,
                              })}
                              placeholder="Enter Task Description"
                            />
                          </div>
                          <div
                            className="mb-6 px-2 flex items-center space-x-3"
                            id="calendar_datepicker"
                          >
                            <div>
                              <label
                                htmlFor="tasks_date"
                                className="text-[14px] font-semibold"
                              >
                                Date
                              </label>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  style={{
                                    zIndex: '99',
                                    marginRight: '-25px',
                                    cursor: 'pointer',
                                    marginBottom: '-8px',
                                  }}
                                  onClick={handleIconClick}
                                >
                                  <path
                                    d="M17.5 8.33366H2.5M13.3333 1.66699V5.00033M6.66667 1.66699V5.00033M6.5 18.3337H13.5C14.9001 18.3337 15.6002 18.3337 16.135 18.0612C16.6054 17.8215 16.9878 17.439 17.2275 16.9686C17.5 16.4339 17.5 15.7338 17.5 14.3337V7.33366C17.5 5.93353 17.5 5.23346 17.2275 4.69868C16.9878 4.22828 16.6054 3.84583 16.135 3.60614C15.6002 3.33366 14.9001 3.33366 13.5 3.33366H6.5C5.09987 3.33366 4.3998 3.33366 3.86502 3.60614C3.39462 3.84583 3.01217 4.22828 2.77248 4.69868C2.5 5.23346 2.5 5.93353 2.5 7.33366V14.3337C2.5 15.7338 2.5 16.4339 2.77248 16.9686C3.01217 17.439 3.39462 17.8215 3.86502 18.0612C4.3998 18.3337 5.09987 18.3337 6.5 18.3337Z"
                                    stroke="#667085"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <DatePicker
                                  open={isOpen}
                                  onClickOutside={handleClickOutside}
                                  onSelect={handleClickOutside}
                                  id="tasks_date"
                                  className="flex h-[4.4rem] w-full border border-input bg-background pl-[3rem] py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded-default"
                                  selected={date}
                                  onChange={handleDateChange}
                                  onFocus={handleInputFocus}
                                  dateFormat="yyyy-MM-dd"
                                  showYearDropdown
                                  dropdownMode="select"
                                  showMonthDropdown
                                  minDate={new Date(1806, 0, 1)}
                                  maxDate={new Date()}
                                />
                              </div>
                            </div>
                            <div className={`${errorMessage && 'mb-[-25px]'}`}>
                              <label
                                htmlFor="time"
                                className="text-[14px] font-semibold"
                              >
                                Time
                              </label>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  style={{
                                    marginRight: '-25px',
                                    cursor: 'pointer',
                                    zIndex: '99',
                                  }}
                                >
                                  <g clip-path="url(#clip0_1927_5979)">
                                    <path
                                      d="M10.0001 5.00033V10.0003L13.3334 11.667M18.3334 10.0003C18.3334 14.6027 14.6025 18.3337 10.0001 18.3337C5.39771 18.3337 1.66675 14.6027 1.66675 10.0003C1.66675 5.39795 5.39771 1.66699 10.0001 1.66699C14.6025 1.66699 18.3334 5.39795 18.3334 10.0003Z"
                                      stroke="#667085"
                                      stroke-width="1.66667"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1927_5979">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div>
                                  <TimePicker
                                    onChange={handleTimeChange}
                                    value={time}
                                    disableClock
                                    className="flex h-[4.4rem] w-full border border-input bg-background pl-[3rem] py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded-default"
                                    id="time"
                                    format="HH:mm"
                                  />
                                  {errorMessage && (
                                    <div className="text-red-500 text-[10px]">
                                      {errorMessage}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div
                              className={
                                form.formState.errors.duration?.message &&
                                'mb-[-25px]'
                              }
                            >
                              <label
                                htmlFor="duration"
                                className="text-[14px] font-semibold"
                              >
                                Duration
                              </label>
                              <Input
                                type="number"
                                className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                                id="duration"
                                value={form.watch('duration')}
                                {...form.register('duration', {
                                  required: false,
                                  validate: value =>
                                    value > 0 ||
                                    'Duration must a positive number',
                                })}
                                maxLength={2}
                              />
                              {form.formState.errors.duration?.message && (
                                <p className="text-red-500 text-[10px]">
                                  {form.formState.errors.duration?.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-end space-x-4">
                            <Button
                              onClick={cancelAddTask}
                              variant="leadBtnTab"
                              type="button"
                              className="px-12 h-[4.4rem] rounded-full mb-8"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="blackBtn"
                              type="submit"
                              disabled={addTaskLoading || updateTaskLoading}
                              className="px-12 h-[4.4rem] rounded-full mb-8"
                            >
                              {(addTaskLoading || updateTaskLoading) && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Add Task
                            </Button>
                          </div>
                        </form>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </Accordion>
            )}
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full py-1"
            value={activeItem?.toString()}
            onValueChange={setActiveItem}
          >
            {tasks?.map((task, idx) => (
              <div className="border px-6 mt-6 rounded-[1.2rem]">
                <AccordionItem
                  value={showAddTaskForm ? 'item-1' : `item-${task?._id}`}
                  key={task?._id}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setShowAddTaskForm(false);
                      setActiveAccordionItem(task);
                    }}
                  >
                    <div className="w-full flex items-center justify-between text-start">
                      <h4 className="leading-none text-md mb-5 text-gray-600 font-semibold">
                        {task?.name}
                      </h4>
                      <div
                        className={`${task?.status === 1
                          ? 'bg-gray-300'
                          : 2
                            ? 'bg-green-300'
                            : 'bg-red-300'
                          } px-2 py-1 rounded-full text-[10px]`}
                      >
                        {task?.status === 1
                          ? 'Open'
                          : 2
                            ? 'Completed'
                            : 'Overdue'}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <form
                      onSubmit={form.handleSubmit(handleCreateTaskSubmit)}
                      className="p-2"
                    >
                      {activeAccordionItem?._id === task?._id && (
                        <>
                          <div className="mb-4">
                            <label
                              htmlFor="taskName"
                              className="text-[14px] font-semibold"
                            >
                              Task Name
                            </label>
                            <Input
                              type="text"
                              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                              id="taskName"
                              value={form.watch('taskName')}
                              {...form.register('taskName', {
                                required: true,
                              })}
                              placeholder="Enter Task Name"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="description"
                              className="text-[14px] font-semibold"
                            >
                              Description
                            </label>
                            <Textarea
                              className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                              id="description"
                              value={form.watch('description')}
                              {...form.register('description', {
                                required: false,
                              })}
                              placeholder="Enter Task Description"
                            />
                          </div>
                          <div
                            className="mb-6 px-2 flex items-center space-x-3"
                            id="calendar_datepicker"
                          >
                            <div>
                              <label
                                htmlFor="date"
                                className="text-[14px] font-semibold"
                              >
                                Date
                              </label>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  style={{
                                    zIndex: '99',
                                    marginRight: '-25px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={handleIconClick}
                                >
                                  <path
                                    d="M17.5 8.33366H2.5M13.3333 1.66699V5.00033M6.66667 1.66699V5.00033M6.5 18.3337H13.5C14.9001 18.3337 15.6002 18.3337 16.135 18.0612C16.6054 17.8215 16.9878 17.439 17.2275 16.9686C17.5 16.4339 17.5 15.7338 17.5 14.3337V7.33366C17.5 5.93353 17.5 5.23346 17.2275 4.69868C16.9878 4.22828 16.6054 3.84583 16.135 3.60614C15.6002 3.33366 14.9001 3.33366 13.5 3.33366H6.5C5.09987 3.33366 4.3998 3.33366 3.86502 3.60614C3.39462 3.84583 3.01217 4.22828 2.77248 4.69868C2.5 5.23346 2.5 5.93353 2.5 7.33366V14.3337C2.5 15.7338 2.5 16.4339 2.77248 16.9686C3.01217 17.439 3.39462 17.8215 3.86502 18.0612C4.3998 18.3337 5.09987 18.3337 6.5 18.3337Z"
                                    stroke="#667085"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <DatePicker
                                  open={isOpen}
                                  onClickOutside={handleClickOutside}
                                  onSelect={handleClickOutside}
                                  id="date"
                                  className="flex h-[4.4rem] w-full border border-input bg-background pl-[3rem] py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded-default"
                                  selected={date}
                                  onChange={handleDateChange}
                                  onFocus={handleInputFocus}
                                  dateFormat="yyyy-MM-dd"
                                  showYearDropdown
                                  dropdownMode="select"
                                  showMonthDropdown
                                  minDate={new Date(1806, 0, 1)}
                                  maxDate={new Date()}
                                />
                              </div>
                            </div>
                            <div className={`${errorMessage && 'mb-[-25px]'}`}>
                              <label
                                htmlFor="time"
                                className="text-[14px] font-semibold"
                              >
                                Time
                              </label>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  style={{
                                    cursor: 'pointer',
                                    marginRight: '-25px',
                                    zIndex: '99',
                                  }}
                                >
                                  <g clip-path="url(#clip0_1927_5979)">
                                    <path
                                      d="M10.0001 5.00033V10.0003L13.3334 11.667M18.3334 10.0003C18.3334 14.6027 14.6025 18.3337 10.0001 18.3337C5.39771 18.3337 1.66675 14.6027 1.66675 10.0003C1.66675 5.39795 5.39771 1.66699 10.0001 1.66699C14.6025 1.66699 18.3334 5.39795 18.3334 10.0003Z"
                                      stroke="#667085"
                                      stroke-width="1.66667"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1927_5979">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <TimePicker
                                  onChange={handleTimeChange}
                                  disableClock
                                  value={time}
                                  className="flex h-[4.4rem] w-full border border-input bg-background pl-[3rem] py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 rounded-default"
                                  id="time"
                                  format="HH:mm"
                                />
                              </div>
                              {errorMessage && (
                                <div className="text-red-500 text-[10px]">
                                  {errorMessage}
                                </div>
                              )}
                            </div>
                            <div
                              className={
                                form.formState.errors.duration?.message &&
                                'mb-[-25px]'
                              }
                            >
                              <label
                                htmlFor="duration"
                                className="text-[14px] font-semibold"
                              >
                                Duration
                              </label>
                              <Input
                                type="number"
                                className="flex h-[4.4rem] w-full border border-input bg-background px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1 rounded-default"
                                id="duration"
                                value={form.watch('duration')}
                                {...form.register('duration', {
                                  required: false,
                                  validate: value =>
                                    value > 0 || 'Duration must be positive',
                                })}
                                maxLength={2}
                              />
                              {form.formState.errors.duration?.message && (
                                <p className="text-red-500 text-[10px]">
                                  {form.formState.errors.duration?.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-end space-x-4 mt-2">
                            <Button
                              variant="destructive"
                              onClick={() => deleteTaskByID(task?._id)}
                              type="button"
                              className="px-12 h-[4.4rem] rounded-full mb-8"
                            >
                              {deleteTaskLoading && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Delete
                            </Button>
                            <Button
                              variant="blackBtn"
                              type="submit"
                              disabled={addTaskLoading || updateTaskLoading}
                              className="px-12 h-[4.4rem] rounded-full mb-8"
                            >
                              {(addTaskLoading || updateTaskLoading) && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Update Task
                            </Button>
                          </div>
                        </>
                      )}
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
            {tasks?.length === 0 && (
              <div className="text-[#101828] font-poppins font-medium text-md text-center">
                No tasks yet!
              </div>
            )}
          </Accordion>
          <div className=" text-center">
            <div className="text-[#667085] text-base font-poppins font-normal mt-4">
              Click the button below to create an assignment now
            </div>
            <div className="mt-8">
              {!showAddTaskForm && (
                <Button
                  variant="blueBtn"
                  type="button"
                  className="px-6 h-[4.7rem] w-full rounded-full"
                  onClick={e => handleAddTask()}
                  disabled={editSelector ? false : true}
                >
                  Add task
                </Button>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
}
