import type { Route } from "./+types/CollectionsPage";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getAllCollections } from "~/features/collections/data/collectionService";
import { createCollection, deleteCollection, updateCollection } from "~/features/collections/data/collectionMutations";
import { ArrowLeft, Edit, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { canDelete, requireRole } from "~/shared/auth/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireRole(request, ["ADMIN", "EDITOR"]);
  const collections = await getAllCollections();
  return { collections, user };
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireRole(request, ["ADMIN", "EDITOR"]);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  try {
    if (intent === "create") {
      await createCollection({
        name: formData.get("name") as string,
        isVisible: formData.get("isVisible") === "on"
      });
      return redirect("/adminManagementSection/collections");
    }

    if (intent === "update") {
      await updateCollection({
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        isVisible: formData.get("isVisible") === "on"
      });
      return redirect("/adminManagementSection/collections");
    }

    if (intent === "delete") {
      // Only admins can delete
      if (user.role !== "ADMIN") {
        return { error: "Only admins can delete collections" };
      }
      await deleteCollection(formData.get("id") as string);
      return redirect("/adminManagementSection/collections");
    }

    return { error: "Invalid action" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
}

export default function CollectionsPage({ loaderData }: Route.ComponentProps) {
  const { collections, user } = loaderData;
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const [editingCollection, setEditingCollection] = useState<
    (typeof collections)[0] | null
  >(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isSubmitting = navigation.state === "submitting";

  const filteredCollections = useMemo(() => {
    if (!searchQuery) return collections;
    const query = searchQuery.toLowerCase();
    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(query),
    );
  }, [collections, searchQuery]);

  const hasActiveFilters = !!searchQuery;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-8 py-16">
        <Link
          to="/adminManagementSection"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Dashboard
        </Link>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Collections Management</h1>
            <p className="text-gray-400">
              All Collections ({filteredCollections.length}
              {hasActiveFilters && ` of ${collections.length}`})
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingCollection(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Collection
          </Button>
        </div>

        {actionData?.error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {actionData.error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-white"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {(showForm || editingCollection) && (
          <CollectionForm
            collection={editingCollection}
            onCancel={() => {
              setEditingCollection(null);
              setShowForm(false);
            }}
            isSubmitting={isSubmitting}
          />
        )}

        <div className="mt-4">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No collections found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onEdit={() => {
                    setEditingCollection(collection);
                    setShowForm(true);
                  }}
                  isSubmitting={isSubmitting}
                  canDelete={canDelete(user.role)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CollectionCard({
                          collection,
                          onEdit,
                          isSubmitting,
                          canDelete: userCanDelete
                        }: {
  collection: {
    id: string;
    name: string;
    isVisible: boolean;
    storyCount?: number;
  };
  onEdit: () => void;
  isSubmitting: boolean;
  canDelete: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold">{collection.name}</h3>
          {!collection.isVisible && (
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              Hidden
            </span>
          )}
        </div>
        <p className="text-gray-400">
          {collection.storyCount || 0}{" "}
          {collection.storyCount === 1 ? "story" : "stories"}
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <Button
          variant="outline"
          onClick={onEdit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        {userCanDelete && (
          <Form method="post">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="id" value={collection.id} />
            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-2 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

function CollectionForm({
                          collection,
                          onCancel,
                          isSubmitting
                        }: {
  collection: { id: string; name: string; isVisible: boolean } | null;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {collection ? "Edit Collection" : "Create New Collection"}
        </h2>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Form method="post" className="space-y-6">
        <input
          type="hidden"
          name="intent"
          value={collection ? "update" : "create"}
        />
        {collection && <input type="hidden" name="id" value={collection.id} />}

        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={collection?.name}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={collection?.isVisible !== false}
              className="w-4 h-4"
            />
            <span>Visible</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : collection
                ? "Update Collection"
                : "Create Collection"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
