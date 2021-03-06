import Layout from 'components/admin-nav/layout'
import React, { useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from 'components/table'
import { Cell, CellProps, Column, TableInstance } from 'react-table'
import { Role } from 'types/permission'
import classNames from 'classnames'
import { Alert } from 'components/modal/cmd-alert'
import { useRouter } from 'next/router'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { User } from 'models/User'

export function StatusPill({ value }: Cell<Record<string, unknown>, Role[]>) {
  const roles = value.map((v) => {
    const role = v ? v.toLowerCase() : 'unknown'
    return (
      <span
        key={role}
        className={classNames(
          'leading-wide max-w-16 rounded-full px-3 py-1 text-xs font-bold uppercase  shadow-sm',
          role.startsWith('admin') ? 'bg-green-100 text-green-800' : null,
          role.startsWith('member') ? 'bg-yellow-100 text-yellow-800' : null,
          role.startsWith('super-admin') ? 'bg-red-100 text-red-800' : null
        )}
      >
        {role}
      </span>
    )
  })

  return <div className={'flex  flex-col gap-2 xl:flex-row'}>{roles}</div>
}

// const Tabel

const Accounts: NextPageWithLayout = () => {
  const router = useRouter()

  const { data, refetch, isLoading } = useAxiosQuery<
    { data: { items: User[] } },
    User[]
  >(
    '/v2/user/list',
    { pageSize: 10000 },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  const { mutate: remove } = useAxiosMutation<unknown>(
    '/v2/user',
    {
      onSuccess: () => {
        refetch()
      },
    },
    'delete'
  )

  const columns = React.useMemo<Column<User>[]>(
    () => [
      // {
      //   Header: 'Name',
      //   accessor: 'name',
      //   Cell: AvatarCell,
      // },
      {
        Header: 'Wallet',
        accessor: 'wallet_address',
        // Cell: StatusPill,
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: StatusPill,
      },
      {
        id: '_action_check',
        Header: '',
        Cell: ({ row }: CellProps<User>) => {
          return (
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push(`/admin/accounts/${row.original._id}`)
              }}
            >
              Edit
            </button>
          )
        },
      },
    ],
    [router]
  )

  const onDelete = useCallback(
    (e: TableInstance<User>) => {
      // setWarning(true)
      Alert.show(
        `Are you sure you want to delete there accounts? All of there
    data will be permanently removed. This action cannot be
    undone.`,
        () => {
          const selecteds = e.selectedFlatRows.map((v) => v.original._id)
          remove({ userIds: selecteds })
        }
      )
    },
    [remove]
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<User>
        name={'Accounts'}
        columns={columns}
        data={data ?? []}
        onDelete={onDelete}
        disableSelection={false}
        isLoading={isLoading}
      />
    </div>
  )
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
