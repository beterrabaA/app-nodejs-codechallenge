import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType,
} from "graphql";

const StatusType = new GraphQLEnumType({
  name: "STATUS",
  values: {
    PENDING: { value: "PENDING" },
    ACCEPTED: { value: "ACCEPTED" },
    REJECTED: { value: "REJECTED" },
  },
});

const TransactionInput = new GraphQLInputObjectType({
  name: "TransactionInput",
  fields: {
    accountExternalIdDebit: { type: GraphQLString },
    accountExternalIdCredit: { type: GraphQLString },
    tranferTypeId: { type: GraphQLInt },
    value: { type: GraphQLFloat },
  },
});

const TransactionRetrieve = new GraphQLObjectType({
  name: "TransactionRetrieve",
  fields: {
    transactionExternalId: { type: GraphQLString },
    transactionType: {
      type: new GraphQLObjectType({
        name: "TransactionType",
        fields: {
          name: { type: GraphQLString },
        },
      }),
    },
    transactionStatus: {
      type: new GraphQLObjectType({
        name: "TransactionStatusType",
        fields: {
          name: { type: GraphQLString },
        },
      }),
    },
    value: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
  },
});

const Transaction = new GraphQLObjectType({
  name: "Transaction",
  fields: {
    id: { type: GraphQLString },
    idDebit: { type: GraphQLString },
    idCredit: { type: GraphQLString },
    typeId: { type: GraphQLInt },
    value: { type: GraphQLFloat },
    status: { type: StatusType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      getTransactions: {
        type: new GraphQLList(Transaction),
      },
      getTransaction: {
        type: Transaction,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createTransaction: {
        type: TransactionRetrieve,
        args: {
          input: { type: new GraphQLNonNull(TransactionInput) },
        },
      },
    },
  }),
});
