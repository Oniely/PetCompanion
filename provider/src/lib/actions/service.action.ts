"use server";

import { revalidatePath } from "next/cache";
import { Service } from "../models/service.model";
import { connectDB } from "../mongoose";
import { fetchUser } from "./user.action";
import { Provider } from "../models/user.model";

interface ServiceParams {
	userId: string;
	image_url: string;
	serviceName: string;
	typeOfService: string;
	description: string;
	duration: number;
	price: number;
	path: string;
}

export const CreateService = async ({
	userId,
	image_url,
	serviceName,
	typeOfService,
	description,
	duration,
	price,
	path,
}: ServiceParams) => {
	try {
		connectDB();

		const user = await fetchUser(userId);

		if (!user) {
			return;
		}

		const service = new Service({
			provider: user._id,
			image_url,
			serviceName,
			typeOfService,
			description,
			duration,
			price,
		});

		const newService = await service.save();

		const updatedProvider = await Provider.findOneAndUpdate(
			{ _id: user._id },
			{ $push: { servicesOffered: newService._id } },
			{ new: true }
		);

		if (!updatedProvider) {
			throw new Error(`Provider not found or update has failed.`)
		}

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`An error occur when creating service: ${error.message}`);
	}
};

export const fetchServices = async (userId: string) => {
	try {
		connectDB();

		const services = await Provider.findOne({ userId }).populate('servicesOffered');

		return services.servicesOffered;
	} catch (error: any) {
		throw new Error(`An error occur while fetching services: ${error.message}`);
	}
}

export const getService = async (serviceId: string) => {
	try {
		connectDB();

		return await Service.findById(serviceId).populate('provider');
	} catch (error: any) {
		throw new Error(`An error occur while fetching a service: ${error.message}`);
	}
}